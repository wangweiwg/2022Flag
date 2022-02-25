const path = require('path');
const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
const { SyncHook } = require('tapable');
const { toUnixPath } = require('../utils');
const { tryExtensions } = require('../utils/tryExtensions');

class Compiler {
    constructor(options) {
        this.options = options
        // 相对路径 Context 参数
        this.rootPath = this.options.context || toUnixPath(process.cwd())
        // 创建plugin hooks
        this.hooks = {
            // 开始编译时的钩子
            run: new SyncHook(),
            // 输出 asset 到 output 目录之前执行（写入文件之前）
            emit: new SyncHook(),
            // 在 compilation 完成时执行，全部完成编译执行
            done: new SyncHook(),
        }
        // 保存所有入口模块对象
        this.entries = new Set()
        // 保存所有依赖模块对象
        this.modules = new Set()
        // 所有的代码块对象
        this.chunks = new Set()
        // 存放本次产出的文件对象
        this.assets = new Set()
        // 存放本次编译所有产出的文件名
        this.files = new Set()
    }

    // run方法启动编译
    // 同时run方法接受外部传递的callback
    run(callback) {
        // 当调用run方法时，触发开始编译的plugin
        this.hooks.run.call()
        // 获取入口配置对象
        const entry = this.getEntry()
        console.log('entry---', entry)
        // 编译入口文件
        this.buildEntryModule(entry)
    }

    // 获取入口文件路径
    getEntry() {
        let entry = Object.create(null);
        const { entry: optionsEntry } = this.options;
        if (typeof optionsEntry === 'string') {
          entry['main'] = optionsEntry
        } else {
          entry = optionsEntry
        }
        // 将entry变成绝对路径
        Object.keys(entry).forEach((key) => {
          const value = entry[key];
          if (!path.isAbsolute(value)) {
            // 转化为绝对路径的同时统一路径分隔符为 /
            entry[key] = toUnixPath(path.join(this.rootPath, value))
          }
        })
        return entry
    }

    // 执行编译入口文件
    buildEntryModule(entry) {
        Object.keys(entry).forEach((entryName) => {
            const entryPath = entry[entryName]
            const entryObj = this.buildModule(entryName, entryPath)
            this.entries.add(entryObj)
        })
    }

    // 模块编译方法
    // 通过 fs 模块根据入口文件路径读取文件源代码
    // 读取文件内容之后，调用所有匹配的loader对模块进行处理得到返回后的结果
    // 得到loader处理后的结果后，通过babel分析loader处理后的代码，进行代码编译(这一步编译
    // 主要是真针对require语句), 修改源代码中require语句的路径
    // 如果该入口文件没有依赖与任何模块(require语句)，那么返回编译后的模块对象
    // 如果该入口文件存在依赖的模块，递归buildModule方法进行模块编译
    buildModule(moduleName, modulePath) {
        // 1. 读取文件原始代码
        const originSourceCode = ((this.originSourceCode = fs.readFileSync(modulePath)), 'utf-8')
        // moduleCode为修改后的代码
        this.moduleCode = originSourceCode
        // 2. 调用loader进行处理
        this.handleLoader(modulePath)
        // 3. 调用webpack 进行模块编译 获得最终的module对象
        const module = this.handleWebpackCompiler(moduleName, modulePath)
        // 4. 返回对应module
        return module
    }

    // 匹配loader处理
    handleLoader(modulePath) {
        const matchLoaders = [];
        // 1. 获取所有传入的loader规则
        const rules = this.options.module.rules
        rules.forEach((loader) => {
          const testRule = loader.test
          if (testRule.test(modulePath)) {
            if (loader.loader) {
              // 仅考虑loader { test:/\.js$/g, use:['babel-loader'] }, { test:/\.js$/, loader:'babel-loader' }
              matchLoaders.push(loader.loader)
            } else {
              matchLoaders.push(...loader.use)
            }
          }
          // 2. 倒序执行loader传入源代码
          for (let i = matchLoaders.length - 1; i >= 0; i--) {
            // 目前我们外部仅支持传入绝对路径的loader模式
            // require引入对应loader
            const loaderFn = require(matchLoaders[i])
            // 通过loader同步处理我的每一次编译的moduleCode
            this.moduleCode = loaderFn(this.moduleCode)
          }
        })
    }

    // 调用webpack进行模块编译
    handleWebpackCompiler(moduleName, modulePath) {
      // 将当前模块相对于项目启动根目录计算出相对路径 作为模块ID
      const moduleId = './' + path.posix.relative(this.rootPath, modulePath);
      // 创建模块对象
      const module = {
        id: moduleId,
        dependencies: new Set(), // 该模块所依赖模块绝对路径地址
        name: [moduleName], // 该模块所属的入口文件
      };
      // 调用babel分析我们的代码
      const ast = parser.parse(this.moduleCode, {
        sourceType: 'module',
      });
      // 深度优先 遍历语法Tree
      traverse(ast, {
        // 当遇到require语句时
        CallExpression:(nodePath) => {
          const node = nodePath.node;
          if (node.callee.name === 'require') {
            // 获得源代码中引入模块相对路径
            const requirePath = node.arguments[0].value;
            // 寻找模块绝对路径 当前模块路径+require()对应相对路径
            const moduleDirName = path.posix.dirname(modulePath);
            const absolutePath = tryExtensions(
              path.posix.join(moduleDirName, requirePath),
              this.options.resolve.extensions,
              requirePath,
              moduleDirName
            );
            // 生成moduleId - 针对于跟路径的模块ID 添加进入新的依赖模块路径
            const moduleId =
              './' + path.posix.relative(this.rootPath, absolutePath);
            // 通过babel修改源代码中的require变成__webpack_require__语句
            node.callee = t.identifier('__webpack_require__');
            // 修改源代码中require语句引入的模块 全部修改变为相对于跟路径来处理
            node.arguments = [t.stringLiteral(moduleId)];
            // 为当前模块添加require语句造成的依赖(内容为相对于根路径的模块ID)
            module.dependencies.add(moduleId);
          }
        },
      });
      // 遍历结束根据AST生成新的代码
      const { code } = generator(ast);
      // 为当前模块挂载新的生成的代码
      module._source = code;
      // 返回当前模块对象
      return module
    }

}

module.exports = Compiler
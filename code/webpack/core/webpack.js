const Compiler = require('./complier');

// 调用webpack
function webpack(options) {
    // 合并参数
    const mergeOptions = _mergeOptions(options);
    // 创建complier对象
    const complier = new Compiler(mergeOptions);
    // 加载插件
    _loadPlugin(options.plugins, complier)
    // 返回compiler实例
    return complier;
}


// 合并参数
// 将外部传入的对象和执行shell时的传入参数进行最终合并
function _mergeOptions(options) {
    const shellOptions = process.argv.slice(2).reduce((option, argv) => {
      // argv -> --mode=production
      const [key, value] = argv.split('=');
      if (key && value) {
        const parseKey = key.slice(2);
        option[parseKey] = value;
      }
      return option;
    }, {});
    return { ...options, ...shellOptions };
}

// 加载插件
function _loadPlugin(plugins, compiler) {
  if (plugins && Array.isArray(plugins)) {
    plugins.forEach(plugin => {
      // 任何一个webpack插件都是一个类（本质上都是function的语法糖）
      // 所以每个插件都必须存在一个apply方法
      // 编写webpack plugin时本质上就是操作 compiler对象，从而影响打包结果
      plugin.apply(compiler)
    })
  }
}

module.exports = webpack;
### 模块化

早期JavaScript开发很容易存在全局污染和依赖管理混乱问题。

```
<body>
  <script src="./index.js"></script>
  <script src="./home.js"></script>
  <script src="./list.js"></script>
</body>
```

如果没有模块化，在html中这么写，就会暴露会系列问题

### 全局污染

没有模块化，script内部的变量是可以相互污染的。比如index.js文件和list.js文件为小A开发的，home.js文件为小B开发的

小A 在index.js中声明 name 属性是一个字符串

```
var name = '我不是外星人'
```

然后小A在 list.js 中引用 name 属性

```
console.log(name)
```

打印发现 name 竟然变成了一个函数、刚开始小A不知所措，后来发现小B开发的home.js文件中这么写道：

```
function name () {}
```

而且这个name 方法被引用了多次，导致一系列的连锁反应

上述例子就是没有使用模块化开发，造成的全局污染的问题，每个加载的js文件都共享变量。当然在实际的项目开发中，

可以使用匿名函数自执行的方式，形成独立的块级作用域解决这个问题。

只需要在home.js中这么写道：

```
(function () {
   function name () {}
})()
```

这样小A就能正常在list.js中获取name属性。但是这只是一个demo，我们不能保证在实际开发中情况会更加复杂。

所以不使用模块开发会暴露出很多风险。

### 依赖管理

依赖管理也是一个难以处理的问题。还是如上的例子，正常情况下，执行js的先后顺序就是script标签排列的前后顺序。

那么如何三个js之间有依赖关系，那么应该如何处理？

### Commonjs

Commonjs的提出，弥补了Javascript对于模块化，没有统一标准的缺陷。nodejs借鉴Commonjs的Module，实现了良好的模块化管理。

commonjs应用场景：

* Node是CommonJS在服务器端一个具有代表性的实现
* Browserify是CommonJS在浏览器中的一种实现
* webpack打包工具对CommonJS的支持和转换，也就是前端应用也可以在编译之前，尽情使用CommonJS进行开发

### CommonJS使用与原理

在使用规范下，有几个显著的特点：

* 在commonjs中每一个js文件都是一个单独的模块，我们称之为module
* 该模块中，包含CommonJS规范的核心变量：exports、module.exports、require
* exports和module.exports可以负责对模块中的内容进行导出
* require函数可以帮助我们导入其他模块(自定义模块、系统模块、第三方模块)中的内容

### CommonJS使用初体验

> 导出：先尝试导出一个模块：

hello.js中

```
let name = '《React进阶实践指南》'
module.exports = function sayName () {
    return name
}
```

> 导入：

home.js

```
const sayName = require('./hello.js')
module.exports = function say () {
    return {
   	name: sayName(),
	author: '我不是外星人'
    }
}
```

如上就是commonjs最简单的实现，那么暴露出两个问题：

* 如何解决变量污染问题
* module.exports、exports、require 三者是如何工作的？又有什么关系？

### commonjs 实现原理

> 首先从上述得知每个模块文件上存在module、exports、require三个变量。然而这三个变量是没有被定义的，但是我们可以在commonjs规范
>
> 下每一个js模块上直接使用它们。在nodejs中还存在 __filename和 __dirname变量

每个变量代表什么意思呢：

* module记录当前模块信息
* require引入模块的方法
* exports 当前模块导出的属性

在编译的过程中，实际Commonjs对 js 的代码进行了首尾包装，我们以上述的home.js为例子，它被包装之后的样子如下：

```
(function(exports, require, module,__filename,__dirname) {
    const sayName = require('./hello.js')
    module.exports = function say() {
   	return {
	    name: sayName(),
	    author: '我不是外星人'
	}
    }
})
```

在Commonjs 规范下模块中，会形成一个包装函数，我们写的代码将作为包装函数的执行上下文，使用的require、exports、module

本质上是通过形参的方式传递到包装函数中的。

包装函数是什么样子呢？

```
function wrapper (script) {
    return '(function (exports, require, module, __filename, __dirname) {' +
	script +
      '\n})'
}
```

包装函数执行：

```
const modulefunction = wrapper(`
    const sayName = require('./hello.js')
    module.exports = function say() {
        return {
	    name: sayName(),
	    author: '我不是外星人'
	}
    }
`)
```

如上模拟了一个包装函数功能，script为我们在js模块中写的内容，最后返回的就是如上包装之后的函数。

当然这个函数暂且是一个字符串

```
runInThisContext(modulefunction)(module.exports, require, module, __filename, __dirname) 

```

在模块加载的时候，会通过runInThisContext(可以理解为eval)执行modulefunction，传入require、exports、

module等参数。最终我们写的nodejs文件就这么执行了。

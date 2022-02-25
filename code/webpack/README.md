初始化参数：通常有两种方式传递打包参数
* cli命令行传递参数（webpack --mode=production）
* webpack.config.js传递参数

第一步：实现参数合并
第二步：编译


目录结构
```
-- webpack
  |-- core(存放我们自己将要实现的webpack核心代码)
    |-- index.js(核心入口文件)
    |-- weebpack.js(作为webpack()方法实现文件)
    |-- compiler.js(编译实现打包的核心流程)
  |-- example(存放我们将用来打包的实例项目)
    |-- webpak.config.js(配置文件)
    |-- src (入口文件)
      |-- entry1(第一个入口文件)
      |-- entry2(二个入口文件)
      |-- index.js(模块文件)
  
  |-- loaders(存放我们的自定义loader)
  |-- pligins(存放我们的自定义plugin)
```
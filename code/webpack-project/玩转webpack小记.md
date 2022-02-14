## 记录玩转webpack学习过程

### 第一章：webpack与构建发展简史
* 前端构建演变历史： ant + YUI Tool -->  grunt  -->  fis3(百度)/gulp  --> rullup/webpack/parcel
* 官方默认配置文件：webpack.config.js, 也可以通过webpack --config 指定配置文件，配置项有entry、output、mode、module、plugin
* webpack4里面讲webpack的内核与webpack-cli进行了分离

### 第二章：webpack基础用法
* entry：指定打包的入口，单入口是一个字符串，多入口是一个对象k-v对
* output：指定打包输出的目录，
* loaders：处理webpack原生不支持的类型，通过loader转化为有效的模块，并且添加到依赖图中。本身是一个函数，接受源文件作为参数，返回转换的结果（babel-loader、css-loader、less-loader、ts-loader、file-loader处理图片文字、raw-loader、thread-loader多进程打包js和css）
* css-loader加载.css文件并打包成commonjs对象，style-loader是创建style标签，插入到html中的head标签
* less-loader将less转化为css
* loader的调用是链式调用，因此是从右往左执行的
* plugins：用于打包输出文件的优化，资源环境和环境变量注入，作用于整个构建过程，loader没办法完成的事情可以通过plugin进行完成（CommonsChunkPlugin将chunks相同的模块代码提取成公共js、CleanWebpackPlugin清理构建目录、ExtractTextWebpackPlugin将css从bundle文件里提取成一个独立的css文件、CopyWebpackPlugin将文件或者文件夹拷贝到构建的输出目录、HtmlWebpaclPlugin创建html文件去承载输出的bundle、UglifyjsWebpackPlugin压缩js文件、ZipWebpackPlugin将打包的资源生成一个zip包）
* mode：指定webpack当前打包的环境，webpack4提出的概念(production、development、none三种模式)
* development：设置process.env.NODE_ENV的值为development。开启NamedChunksPlugin 和NamedModulesPlugin
* production：设置process.env.NODE_ENV的值为production。开启FlagDependencyUsagePlugin、FlagIncludedChunksPlugin、ModuleConcatenationPlugin、NoEmitOnErrorPlugin、OccurrenceOrderPlugin、SideEffectsFlagPlugin和TerserPlugin
* Node：不开启任何优化选项

* 解析ES6语法：babel-loader
* 解析React JSX：@babel/preset-react
* 解析css文件：css-loader
* 解析图片和字体：file-loader，可以处理jpg、jpeg、png、gift、webp等格式图片
* 解析图片和字体：url-loader也可以处理图片和字体，可以设置较小资源自动base64
* webpack文件监听：发现源代码发生变化时，自动重新构建输出的文件
  开启监听有两种模式：带上--watch，设置watch为true
* 文件监听的原理：轮训判断文件的最后编辑时间是否变化。某一个文件发生变化，并不会立刻告诉监听者，而是先缓存起来，等aggregateTimeout。可以设置ignore设置node_modules进行性能优化
* webpack中的热更新及其原理：webpack-dev-server，Webpack Compile将JS编译成Bundle，HMR Server将热更新的文件输出给HMR Runtime，Bundle Server提供文件在浏览器的访问，HMR Runtime会被注入带浏览器更新文件的变化


### 第三章：webpack进阶用法
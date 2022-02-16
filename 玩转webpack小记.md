## 记录玩转webpack学习过程

### 第一章：webpack与构建发展简史
* 前端构建演变历史： ant + YUI Tool -->  grunt  -->  fis3(百度)/gulp  --> rollup/webpack/parcel
* 官方默认配置文件：webpack.config.js, 也可以通过webpack --config 指定配置文件，配置项有entry、output、mode、module、plugins
* webpack4里面将webpack的内核与webpack-cli进行了分离

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
* webpack文件监听：发现源代码发生变化时，自动重新构建输出的文件。开启监听有两种模式：带上--watch，设置watch为true
* 文件监听的原理：轮询判断文件的最后编辑时间是否变化。某一个文件发生变化，并不会立刻告诉监听者，而是先缓存起来，等aggregateTimeout。可以通过ignore设置node_modules进行性能优化
* webpack中的热更新及其原理：webpack-dev-server，Webpack Compile将JS编译成Bundle，HMR Server将热更新的文件输出给HMR Runtime，Bundle Server提供文件在浏览器的访问，HMR Runtime会被注入到浏览器更新文件的变化

* 文件指纹：打包输出的文件名的后缀，可以做版本管理。有三种形式：Hash、Chunkhash、Contenthash
* mini-css-extract-plugin与style-loader是互斥的，它是提取css的
* html、css、js代码压缩：uglifyjs-webpack-plugin来实现的
* optimize-css-assets-webpack-plugin： css的压缩
* html-webpack-plugin设置压缩参数，一个entry对应一个html-webpack-plugin
* webpack可以通过--config参数来指定webpack打包的文件，用来区分dev、pro环境中不同的打包

### 第三章：webpack进阶用法
* clean-webpack-plugin自动清吗除构建目录
* postcss-loader和autoprefixer：PostCSS插件autoprefixer自动补齐css3前缀
* px2rem-loader：移动端css自动px转换成rem(font-size of the root element)
* 静态资源内联：raw-loader，html-webpack-plugin使用的模板是ejs
* 多页面应用打包方案：glob获取src目录下面规定的层级关系

* sourcemap，通过devtools来设置不同的值
* 提取页面公共资源：使用html-webpack-externals-pluin插件将react、react-dom基础包通过cdn引入，不打入bundle中。还可以利用split-chunks-plugin（webpack4内置的，之前使用common-chunk-plugin）进行公共脚本分离

* tree shaking(摇树优化)：1个模块可能有多个方法，只要其中某一个方法使用到了，整个文件都会被打包到bundle里面去，tree shaking就是只把用到的方法打包到bundle中，没用到的方法会在uglify阶段被擦除掉。使用：webpack默认支持，在.babelrc里面设置modules: false即可。production mode的情况下默认开启。要求必须是es6语法，CJS的方法不支持。

* Scope Hoisting：production模式下默认开启。构建后的代码存在大量闭包代码包裹，导致体积增大，运行代码时创建的函数作用域越多，内存开销变大。（模块初始化函数）
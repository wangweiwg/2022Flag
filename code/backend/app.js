const path = require('path');
const Koa = require('koa');
const static = require('koa-static');

const port = 5000;

const app = new Koa();

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './client/build'

app.use(static(
    path.join( __dirname,  staticPath)
))


app.use( async ( ctx ) => {
    ctx.body = 'hello world'
})

app.listen(port, () => {
    console.log(`server listen at ${port} port`);
})
const path = require('path');
const Koa = require('koa');
const static = require('koa-static');
const LogMiddleware = require('./src/middleware/log.middleware');
const query = require('./src/utils/db');

query('SELECT * FROM test').then(res => {
    console.log('获取到的所有数据---', res)
})


const port = 5000;

const app = new Koa();

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './client/build'
// app.use(static(
//     path.join( __dirname,  staticPath)
// ))

// logger
app.use(LogMiddleware());

// response
app.use(async ctx => {
    console.log('3')
    ctx.body = 'Hello World';
});

// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, staticPath, 'index.html'));
// });

app.listen(port, () => {
    console.log(`server listen at 127.0.0.1:${port}`);
})
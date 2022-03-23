const path = require('path');
const Koa = require('koa');
const static = require('koa-static');
const mysql = require('mysql');
const LogMiddleware = require('./src/middleware/log.middleware');

// 创建数据池
const pool  = mysql.createPool({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'Wangwei@123',
    database : 'wangwei'  // 选中数据库
})

// 在数据池中进行会话操作
pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM test',  (error, results, fields) => {
    console.log('result---', results)
    // 结束会话
    connection.release();

    // 如果有错误就抛出
    if (error) throw error;
  })
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
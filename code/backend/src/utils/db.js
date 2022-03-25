/**
 * 数据库操作
 */
const mysql = require('mysql');

// 创建数据池
const pool  = mysql.createPool({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'Wangwei@123',
    database : 'wangwei'  // 选中数据库
})

// 操作数据库
const query = (sql) => {
    return new Promise((resolve, reject) => {
        // 在数据池中进行会话操作
        pool.getConnection(function(err, connection) {
            if (err) {
                reject(err);
            }
            connection.query(sql,  (error, results, fields) => {
                if (error) {
                    reject(error);
                }
                // 获取到数据
                resolve(results);
                // 结束会话
                connection.release();
            })
        })
    })
}

module.exports = {
    query
};
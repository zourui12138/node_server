// 连接MySQL数据库
import mysql from 'mysql'
const connection = mysql.createConnection({
    host     : '192.168.125.149',
    user     : 'root',
    password : 'admin',
    database : 'node'
});
connection.connect();

module.exports = connection;
const mysql = require('mysql');
// 初始化表结构

const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'videoLib',
	port: '3306',
});

module.exports = pool;

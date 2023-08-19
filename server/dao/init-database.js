const query = require('./index');

/**
 * 用户表结构
 */
const users = `create table if not exists users(
     id INT NOT NULL AUTO_INCREMENT,
     username VARCHAR(100) NOT NULL,
     password VARCHAR(100) NOT NULL,
     PRIMARY KEY ( id )
    );`;

let videos = `create table if not exists videos(
     id INT NOT NULL AUTO_INCREMENT,
     name VARCHAR(100) NOT NULL,
     classify VARCHAR(100),
     img VARCHAR(40),
     star INT(40) NOT NULL DEFAULT 0,
     timelong VARCHAR(40),
     author VARCHAR(100),
     detail VARCHAR(1000),
	 tags VARCHAR(100),
     PRIMARY KEY ( id )
    );`;

let createTable = (sql) => {
	return query(sql, []);
};
const init = () => {
	// 建表
	createTable(videos);
	createTable(users);
};

module.exports = init;

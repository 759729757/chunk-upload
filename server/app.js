const express = require('express');
const app = express();
const cors = require('cors');
// 解决跨域
app.use(cors());

const initDatabase = require('./dao/init-database');

const bigRouter = require('./routes/index');

// 初始化表
initDatabase();

app.use('/file', bigRouter);

app.listen(3001, () => {
	console.log('http://localhost:3001/');
});

const express = require('express');
const app = express();
const cors = require('cors');
// 解决跨域
app.use(cors());
const user = require('./routes/user');
const filter = require('./filter');

const initDatabase = require('./dao/init-database');

const bigRouter = require('./routes/index');

// 初始化表
initDatabase();

app.use('/admin', express.json(), user);
app.use('/*', filter.verify);
app.use('/file', bigRouter);

app.listen(3001, () => {
	console.log('http://localhost:3001/');
});

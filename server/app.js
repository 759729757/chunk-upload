const express = require('express');
const app = express();
const cors = require('cors');
// 解决跨域
app.use(cors());
const user = require('./routes/user');
const video = require('./routes/video');
const filter = require('./filter');

const initDatabase = require('./dao/init-database');

const file = require('./routes/file');

// 初始化表
initDatabase();

app.use('/admin', express.json(), user);
app.use('/*/auth', filter.verify);
app.use('/file/auth', file);
app.use('/video', express.json(), video);

app.listen(3001, () => {
	console.log('http://localhost:3001/');
});

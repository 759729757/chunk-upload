var express = require('express');
var router = express.Router();
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const config = require('../config');
const requestCode = config.requestCode;
const { find, add, del, update } = require('../dao/video-lib');

// 添加视频信息
router.post('/auth/add', function (req, res) {
	const query = req.body;
	add([query.name, query.filename, query.desc, query.author]).then(function (
		result,
		reject
	) {
		res.jsonp({
			data: result,
			msg: 'success',
			code: requestCode.success,
		});
	});
});
// 获取视频列表
router.get('/fetch', function (req, res) {
	const query = req.query;
	find(query).then(function (result, reject) {
		res.jsonp({
			data: result,
			msg: 'success',
			code: requestCode.success,
		});
	});
});

router.post('/auth/update', function (req, res) {
	const id = req.body.id;
	const condition = req.body;
	delete condition['id'];
	if (!id) {
		res.jsonp({
			data: '',
			msg: 'data invaild',
			code: requestCode.dataInvalid,
		});
	}
	update(id, condition).then(function (result, reject) {
		res.jsonp({
			data: result,
			msg: 'success',
			code: requestCode.success,
		});
	});
});

// 删除某个视频
router.post('/auth/del', function (req, res) {
	const id = req.body.id;
	if (!id) {
		res.jsonp({
			data: '',
			msg: 'data invaild',
			code: requestCode.dataInvalid,
		});
		return;
	}
	del(id).then(function (result, reject) {
		res.jsonp({
			data: result,
			msg: 'success',
			code: requestCode.success,
		});
	});
});

module.exports = router;

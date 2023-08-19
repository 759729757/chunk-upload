var express = require('express');
var router = express.Router();
const { findUser } = require('../dao/user');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const config = require('../config');
const requestCode = config.requestCode;

//实现登录验证功能
router.post('/manager_login', function (req, res) {
	const query = req.body;
	findUser(query.userName, query.password).then(function (result, reject) {
		if (result[0]) {
			const token = jwt.sign(
				{
					data: result[0],
				},
				config.secretKey,
				{ expiresIn: config.expired }
			);

			res.jsonp({
				data: token,
				msg: 'success',
				code: requestCode.success,
			});
		} else {
			res.jsonp({
				data: null,
				msg: 'no found',
				code: requestCode.noFound,
			});
		}
	});
});

module.exports = router;

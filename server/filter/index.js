// 登陆过滤
const jwt = require('jsonwebtoken');
const config = require('../config');
const requestCode = config.requestCode;
class Filter {
	verify(req, res, next) {
		try {
			var decode = jwt.verify(req.header('u'), config.secretKey);
			if (decode.data) {
				next();
			} else {
				throw new Error('invaild token');
			}
		} catch (err) {
			// err
			res.jsonp({
				code: requestCode.noAccess,
			});
		}
	}
}

const filter = new Filter();
module.exports = filter;

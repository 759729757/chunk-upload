const bigFormController = require('../controller/index');
const videoDao = require('../dao/video-lib');

const express = require('express');

const router = express.Router();

router.post('/check', bigFormController.check);
router.post('/upload', bigFormController.upload);
router.post('/merge', (req, res) => {
	bigFormController.merge(req).then((result) => {
		// 上传成功
		if (result.code === 200) {
			videoDao.add(['test', 'common']).then((sqlResult) => {
				console.log('sql:', sqlResult);
				res.jsonp(result);
			});
		} else {
			res.jsonp(result);
		}
	});
});
module.exports = router;

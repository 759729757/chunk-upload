const bigFormController = require('../controller/index');

const express = require('express');
// var mysql = require('mysql');

// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '123456',
//     database: 'videoLib',
//     port: '3306',
// });

// connection.connect(function(err) {
//     if (err) {
//       console.error('error connecting: ' + err.stack);
//       return;
//     }

//     console.log('connected as id ' + connection.threadId);
//   });

const router = express.Router();

router.post('/check', bigFormController.check);
router.post('/upload', bigFormController.upload);
router.post('/merge', bigFormController.merge);
module.exports = router;

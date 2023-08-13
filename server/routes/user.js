var express = require('express');
var router = express.Router();



//实现登录验证功能
router.get('/login', function (req, res) {
    var name = req.query.name;
    var pwd = md5(req.query.pwd);
    console.log('pwd', pwd);
    var selectSQL = "select * from information where useName = '" + name + "' and password = '" + pwd + "'";
    connection.query(selectSQL, function (err, rs) {
        if (err) throw err;
        console.log('登陆', rs);
        console.log('OK');
        res.sendfile(__dirname + "/" + "OK.html");
    })
})
module.exports = router
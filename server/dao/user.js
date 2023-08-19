const query = require('./index');

// 查找用户
let findUser = (name, password) => {
	var _sql = `select * from users where username="${name}" AND password="${password}" ; `;
	return query(_sql);
};

// 添加手机用户
let add = (value) => {
	var _sql = `insert into users set userName=?,password=?`;
	return query(_sql, value);
};
// add([]);

module.exports = {
	findUser,
};

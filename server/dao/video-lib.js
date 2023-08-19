const query = require('./index');

// 查找
let find = (name, classify) => {
	var _sql = `select * from videos where like name '%${name}%' or classify="${classify}" ; `;
	return query(_sql);
};

// 添加
let add = (value) => {
	var _sql = `insert into videos set name=?,classify=?`;
	return query(_sql, value);
};
// addMobileUser();

module.exports = {
	find,
	add,
};

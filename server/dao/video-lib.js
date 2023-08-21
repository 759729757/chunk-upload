const query = require('./index');

// 查找
let find = (condition) => {
	var _sql = `select * from videos`;
	if (Object.keys(condition).length) {
		_sql += ' where ';
	}
	let i = 0;
	for (let key in condition) {
		if (i > 0) {
			_sql += ' or ';
		}
		_sql += `${key} like '%${condition[key]}%' `;
		i++;
	}
	_sql += ';';
	return query(_sql);
};

// 添加
let add = (value) => {
	var _sql = `insert into videos set name=?,filename=?,descript=?,author=?`;
	return query(_sql, value);
};
// addMobileUser();

// 添加
let del = (id) => {
	var _sql = `delete from videos where id=?`;
	return query(_sql, [id]);
};

// 添加
let update = (id, condition) => {
	var _sql = `update videos`;
	if (Object.keys(condition).length) {
		_sql += ' set ';
	}
	let i = 0;
	for (let key in condition) {
		if (i > 0) {
			_sql += ' , ';
		}
		_sql += `${key} = '${condition[key]}' `;
		i++;
	}
	_sql += `where id=${id};`;
	return query(_sql);
};

// let find = (condition) => {
// 	var _sql = `select * from videos`;
// 	if (Object.keys(condition).length) {
// 		_sql += ' where ';
// 	}
// 	let i = 0;
// 	for (let key in condition) {
// 		if (i > 0) {
// 			_sql += ' or ';
// 		}
// 		_sql += `${key} like '%${condition[key]}%' `;
// 		i++;
// 	}
// 	_sql += ';';
// 	return query(_sql);
// };

module.exports = {
	find,
	add,
	del,
	update,
};

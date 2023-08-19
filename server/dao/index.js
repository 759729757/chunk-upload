const pool = require('./db');

var query = (sql, val) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				return resolve(err);
			} else {
				connection.query(sql, val, (err, rows) => {
					console.log('执行查询语句：');
					console.log(sql);
					if (err) {
						reject(err);
					} else {
						resolve(rows);
					}
					connection.release();
				});
			}
		});
	});
};

module.exports = query;

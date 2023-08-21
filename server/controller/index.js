const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const config = require('../config');
const baseUrl = 'http://localhost:3000/file/';
const dirPath = path.join(__dirname, '../public/');
const transFileName = config.fileTrans; // 文件中转目录
const fileLib = config.filesLib; // 文件存储目录

mkdirPath(dirPath + transFileName);
mkdirPath(dirPath + fileLib);

// 多个块合并成一个文件
function mergeFile(filePath, newPath) {
	return new Promise((resolve, reject) => {
		let files = fs.readdirSync(filePath),
			newFile = fs.createWriteStream(newPath);
		let filesArr = files.sort((a, b) => {
			return Number(a) - Number(b);
		});

		main(0);

		function main(index) {
			let currentFile = filePath + '/' + filesArr[index];
			let stream = fs.createReadStream(currentFile);
			stream.pipe(newFile, {
				end: false,
			});
			stream.on('end', function () {
				if (index < filesArr.length - 1) {
					index++;
					main(index);
				} else {
					resolve({
						code: 200,
					});
				}
			});
			stream.on('error', function (error) {
				reject({
					code: 102,
					data: {
						error,
					},
				});
			});
		}
	});
}

const checkQuery = (md5Val, total) => {
	if (!md5Val) {
		return {
			code: 101,
			msg: 'get_fail',
			data: {
				info: '文件md5值不能为空！',
			},
		};
	}
	if (!total) {
		return {
			code: 101,
			msg: 'get_fail',
			data: {
				info: '文件切片数量不能为空！',
			},
		};
	}
	return {
		code: 200,
	};
};

const check = async (req, res) => {
	let md5Val = req.query.md5Val;
	let total = req.query.total;
	let bigDir = dirPath + transFileName;

	let checkObj = checkQuery(md5Val, total);
	if (checkObj.code != 200) {
		return res.json(checkObj);
	}
	let filePath = `${bigDir}${md5Val}`;
	fs.readdir(filePath, (err, data) => {
		if (err) {
			fs.mkdir(filePath, (err) => {
				if (err) {
					return res.json({
						code: 101,
						msg: 'get_fail',
						data: {
							info: '获取失败！',
							err,
						},
					});
				} else {
					return res.json({
						code: 200,
						msg: 'get_succ',
						data: {
							info: '获取成功！',
							data: {
								type: 'write',
								chunk: [],
								total: 0,
							},
						},
					});
				}
			});
		} else {
			return res.json({
				code: 200,
				msg: 'get_succ',
				data: {
					info: '获取成功！',
					data: {
						type: 'read',
						chunk: data,
						total: data.length,
					},
				},
			});
		}
	});
};

const upload = async (req, res) => {
	let md5Val = req.query.md5Val;
	let total = req.query.total;
	let bigDir = dirPath + transFileName;

	let checkObj = checkQuery(md5Val, total);
	if (checkObj.code != 200) {
		return res.json(checkObj);
	}
	let current = req.query.current;
	if (!current) {
		return res.json({
			code: 101,
			msg: 'get_fail',
			data: {
				info: '文件当前分片值不能为空！',
			},
		});
	}

	let form = formidable({
		multiples: true,
		uploadDir: `${dirPath}${transFileName}${md5Val}/`,
	});

	form.parse(req, (err, fields, files) => {
		if (err) {
			return res.json(err);
		}
		let newPath = `${dirPath}${transFileName}${md5Val}/${current}`;
		fs.rename(files.file.filepath, newPath, function (err) {
			if (err) {
				return res.json(err);
			}
			return res.json({
				code: 200,
				msg: 'get_succ',
				data: {
					info: 'upload success!',
				},
			});
		});
	});
};

const merge = (req) => {
	return new Promise(async (resolve, reject) => {
		let md5Val = req.query.md5Val;
		let total = req.query.total;
		let bigDir = dirPath + transFileName;

		let checkObj = checkQuery(md5Val, total);
		if (checkObj.code != 200) {
			resolve(checkObj);
		}
		let ext = req.query.ext;
		if (!ext) {
			resolve({
				code: 101,
				msg: 'get_fail',
				data: {
					info: '文件后缀不能为空！',
				},
			});
		}

		let oldPath = `${dirPath}${transFileName}${md5Val}`;
		let newPath = `${dirPath}${fileLib}/${md5Val}.${ext}`;
		let data = await mergeFile(oldPath, newPath);
		if (data.code == 200) {
			// 合并成功后删除中转目录
			deleteFolderRecursive(oldPath);
			resolve({
				code: 200,
				msg: 'get_succ',
				data: {
					info: '文件合并成功！',
					url: `${baseUrl}${md5Val}.${ext}`,
				},
			});
		} else {
			resolve({
				code: 101,
				msg: 'get_fail',
				data: {
					info: '文件合并失败！',
					err: data.data.error,
				},
			});
		}
	});
};

// 递归删除目录
function deleteFolderRecursive(folderPath) {
	if (fs.existsSync(folderPath)) {
		fs.readdirSync(folderPath).forEach((file, index) => {
			const curPath = path.join(folderPath, file);
			if (fs.lstatSync(curPath).isDirectory()) {
				// 递归删除子目录
				deleteFolderRecursive(curPath);
			} else {
				// 删除文件
				fs.unlinkSync(curPath);
			}
		});
		// 删除空目录
		fs.rmdirSync(folderPath);
	}
}

/**
 * 判读路径是否存在,如不存在创建文件夹
 */
function mkdirPath(pathStr) {
	if (fs.existsSync(pathStr)) {
		return;
	} else {
		fs.mkdirSync(pathStr);
	}
}

module.exports = {
	check,
	upload,
	merge,
};

const config = {
	// token 密钥
	secretKey: 'video-token-123-secret',
	// token 过期时间（单位 秒）
	expired: 60 * 60, // 1小时

	// 文件中转目录, 目前在public下
	fileTrans: 'trans',
	// 文件存储目录, 目前在public下
	filesLib: 'files',

	// 请求响应代码
	requestCode: {
		success: 200,
		noAccess: 202, // 没权限
		error: 500, // 客户端有错误
		noFound: 404, // 查询不到期望数据
		dataInvalid: 402, // 数据有误
	},
};

module.exports = config;

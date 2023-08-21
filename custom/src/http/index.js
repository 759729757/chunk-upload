import axios from 'axios';

const baseUrl = 'http://localhost:3001';

export default {
	init: function () {
		axios.defaults.baseURL = baseUrl;
		axios.interceptors.response.use(
			(res) => {
				console.log('响应成功的拦截', res);
				// 202 状态为未登陆状态
				if (res.data.code === 202) {
					alert('未登陆， 请登录后重试');
				}

				// 1.结束loading的动画

				// 2.对数据进行转化, 再返回数据
				return res.data;
			},
			(err) => {
				console.log('响应失败的拦截:', err);
				return err;
			}
		);
		// 处理 token
		const token = localStorage.getItem('u');
		if (token) {
			axios.defaults.headers['u'] = token;
		}
	},
	setHeader: function (name, value) {
		axios.defaults.headers[name] = value;
	},
};

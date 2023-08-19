import axios from 'axios';

const baseUrl = 'http://localhost:3001';

export default {
	init: function () {
		axios.defaults.baseURL = baseUrl;
	},
};

<template>
	<div class="bg">
		<div class="form">
			<el-form
				:label-position="labelPosition"
				label-width="100px"
				:model="formLabelAlign"
				style="max-width: 460px">
				<el-form-item>
					<h2>用户登陆</h2>
				</el-form-item>
				<el-form-item label="用户名">
					<el-input
						:prefix-icon="User"
						v-model="formLabelAlign.name" />
				</el-form-item>
				<el-form-item label="密码">
					<el-input
						:prefix-icon="Lock"
						v-model="formLabelAlign.psw"
						type="password" />
				</el-form-item>
				<el-form-item>
					<el-button
						class="full-btn"
						type="info"
						@click="submit"
						>登陆</el-button
					>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { User, Lock } from '@element-plus/icons-vue';
import md5 from 'md5';
import axios from 'axios';

const labelPosition = ref('right');

const formLabelAlign = reactive({
	name: '',
	psw: '',
});

const submit = () => {
	axios
		.post('/admin/manager_login', {
			userName: formLabelAlign.name,
			password: md5(formLabelAlign.psw),
		})
		.then(function (response) {
			// handle success
			console.log(response);
			const data = response.data;
			if (data.code === 200) {
				axios.defaults.headers['u'] = data.data;
			}
		})
		.catch(function (error) {
			// handle error
			console.log(error);
		})
		.finally(function () {
			// always executed
		});
};
</script>
<style>
body {
	background-color: #eee;
	background-image: url('../assets/bg.webp');
	background-size: cover;
}
</style>
<style lang="scss" scoped>
.bg {
	width: 100%;
	height: 100%;
}
.form {
	width: 400px;
	background-color: #fff;
	padding: 50px;
	padding-left: 0;
	padding-top: 30px;
	border-radius: 10px;
}
.full-btn {
	width: 100%;
}
</style>

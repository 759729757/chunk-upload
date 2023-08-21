<template>
	<div class="list">
		<el-table
			:data="_data"
			stripe
			style="width: 100%">
			<el-table-column
				prop="name"
				label="标题"
				width="180" />
			<el-table-column
				prop="author"
				label="作者"
				width="180" />
			<el-table-column
				prop="descript"
				label="描述"
				width="180" />
			<el-table-column
				fixed="right"
				label="操作"
				width="180">
				<template #default="scope">
					<el-button
						link
						type="primary"
						size="small"
						>查看</el-button
					>
					<el-button
						link
						type="primary"
						size="small"
						@click.prevent="update(scope.row)"
						>编辑</el-button
					>
					<el-button
						link
						type="primary"
						size="small"
						@click.prevent="del(scope.row)"
						>删除</el-button
					>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { User, Lock } from '@element-plus/icons-vue';
import md5 from 'md5';
import axios from 'axios';
import http from '../http';
import { useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus';
const router = useRouter();

const _data = ref();

const formLabelAlign = reactive({
	name: '',
	author: '',
});

const update = (data) => {
	let _data = JSON.parse(JSON.stringify({ ...data }));
	// delete _data['id'];
	router.push({
		name: 'upload',
		query: _data,
	});
};

const del = (data) => {
	ElMessageBox.confirm(`是否删除 ${data.name} `, 'Warning', {
		confirmButtonText: '确定',
		cancelButtonText: '却笑',
		type: 'warning',
	})
		.then(() => {
			axios
				.post('/video/auth/del', {
					id: data.id,
				})
				.then(function (response) {
					console.log(response);
					getVideo();
				});
		})
		.catch(() => {});
};

const getVideo = () => {
	axios
		.get('/video/fetch', {
			// params: {
			// 	name: formLabelAlign.name,
			// 	author: formLabelAlign.author,
			// },
		})
		.then(function (response) {
			// handle success
			console.log(response);
			_data.value = response.data;
		})
		.catch(function (error) {
			// handle error
			console.log(error);
		})
		.finally(function () {
			// always executed
		});
};
getVideo();
</script>
<style lang="scss" scoped></style>

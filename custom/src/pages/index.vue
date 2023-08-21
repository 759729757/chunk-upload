<template>
	<div class="">
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
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import md5 from 'md5';
import axios from 'axios';
import http from '../http';
import { useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus';
const router = useRouter();

const _data = ref();

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

<style></style>

<template>
	<el-form
		ref="ruleFormRef"
		:model="ruleForm"
		:rules="rules"
		label-width="120px"
		class="demo-ruleForm"
		:size="formSize"
		status-icon>
		<el-form-item
			label="标题"
			prop="name">
			<el-input v-model="ruleForm.name" />
		</el-form-item>
		<el-form-item
			label="描述"
			prop="descript">
			<el-input
				type="textarea"
				v-model="ruleForm.descript" />
		</el-form-item>
		<el-form-item
			label="作者"
			prop="author">
			<el-input v-model="ruleForm.author" />
		</el-form-item>
		<el-form-item
			v-if="!isEdit"
			label="文件"
			prop="video">
			<BigForm
				ref="bigform"
				@canUpload="canUpload = true"
				@submitInfo="submit" />
		</el-form-item>
		<el-form-item>
			<el-button
				type="primary"
				@click="verifyForm(ruleFormRef)"
				:disabled="!canUpload">
				提交
			</el-button>
			<!-- <el-button @click="resetForm(ruleFormRef)">Reset</el-button> -->
		</el-form-item>
	</el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import BigForm from './bigform.vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
import { ElNotification } from 'element-plus';

const bigform = ref(); // bigform 组件实例

const canUpload = ref(false);

interface RuleForm {
	name: string;
	descript: string;
	author: string;
}

const formSize = ref('default');
const ruleFormRef = ref<FormInstance>();
let ruleForm = ref<RuleForm>({
	name: '',
	descript: '',
	author: '',
});

const isEdit = ref(false);

// 如果接收到默认数据则是要修改
const params = route.query;
if (params.name) {
	// 不显示上传文件
	ruleForm.value = { ...params } as any;
	isEdit.value = true;
	canUpload.value = true;
}

const rules = reactive<FormRules<RuleForm>>({
	name: [{ required: true, message: '文件名不能为空', trigger: 'blur' }],
	// desc: [
	// 	{ required: true, message: 'Please input activity form', trigger: 'blur' },
	// ],
});

const verifyForm = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	await formEl.validate((valid, fields) => {
		if (valid && !isEdit.value) {
			bigform.value.beginUpload();
		} else if (isEdit.value) {
			submit(null);
		} else {
			console.log('error submit!', fields);
		}
	});
};

// 提交
const submit = (fileName) => {
	console.log('fileName', fileName);
	if (isEdit.value) {
		axios.post('/video/auth/update', ruleForm.value).then(function (response) {
			// handle success
			console.log(response);
			ruleFormRef.value?.resetFields();
			ElNotification({
				title: '系统提示',
				type: 'success',
				message: '修改成功',
			});
			router.push('./');
		});
		return;
	}
	axios
		.post('/video/auth/add', {
			name: ruleForm.value.name,
			filename: fileName,
			desc: ruleForm.value.descript,
			author: ruleForm.value.author,
		})
		.then(function (response) {
			// handle success
			console.log(response);
			ruleFormRef.value?.resetFields();
			ElNotification({
				title: '系统提示',
				type: 'success',
				message: '提交成功',
			});
			router.push('./');
		});
};

const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
};

const options = Array.from({ length: 10000 }).map((_, idx) => ({
	value: `${idx + 1}`,
	label: `${idx + 1}`,
}));
</script>

<template>
	<div class="full-warp">
		<div class="nav"></div>
		<div class="flex">
			<el-menu
				default-active="0"
				class="el-menu-vertical-demo left-part"
				:collapse="isCollapse"
				@open="handleOpen"
				@close="handleClose">
				<el-menu-item index="0">
					<el-icon><icon-menu /></el-icon>
					<template #title>
						<router-link to="/admin/">视频列表</router-link></template
					>
				</el-menu-item>
				<el-menu-item index="2">
					<el-icon><Plus /></el-icon>
					<template #title>
						<router-link to="/admin/upload">上传视频</router-link>
					</template>
				</el-menu-item>
				<el-menu-item index="3">
					<el-icon><document /></el-icon>
					<template #title>修改密码</template>
				</el-menu-item>
				<el-menu-item index="4">
					<el-icon><setting /></el-icon>
					<template #title>退出登陆</template>
				</el-menu-item>
			</el-menu>
			<div class="right-part">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
	Document,
	Menu as IconMenu,
	Plus,
	Setting,
} from '@element-plus/icons-vue';

const isCollapse = ref(false);
const handleOpen = (key: string, keyPath: string[]) => {
	console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
	console.log(key, keyPath);
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 200px;
	min-height: 400px;
}
.nav {
	height: 60px;
	background-color: #eee;
}
.left-part {
}
</style>

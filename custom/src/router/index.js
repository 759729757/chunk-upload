import {
	createRouter,
	createWebHistory,
	createWebHashHistory,
} from 'vue-router';
import Bigform from '@/components/bigform.vue';
import Login from '@/pages/login.vue';

const routes = [
	{
		path: '/',
		component: Login,
	},
	{
		path: '/upload',
		component: Bigform,
	},
];

const router = createRouter({
	// history: createWebHistory(),
	history: createWebHashHistory(),
	routes,
});

export default router;

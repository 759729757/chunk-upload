import {
	createRouter,
	createWebHistory,
	createWebHashHistory,
} from 'vue-router';
import Bigform from '@/components/bigform.vue';
import Upload from '@/components/upload.vue';
import List from '@/components/video-list.vue';
import AdminHome from '@/pages/AdminHome.vue';
import Login from '@/pages/login.vue';

const routes = [
	{
		path: '/',
		component: Login,
	},
	{
		path: '/admin',
		component: AdminHome,
		children: [
			{ path: '', name: 'list', component: List },
			{ path: 'upload', name: 'upload', component: Upload },
		],
		beforeEnter: (to, from) => {
			const token = localStorage.getItem('u');
			if (!token) {
				return { path: '/', query: {}, hash: to.hash };
			}
			// reject the navigation
		},
	},
];

const router = createRouter({
	// history: createWebHistory(),
	history: createWebHashHistory(),
	routes,
});

export default router;

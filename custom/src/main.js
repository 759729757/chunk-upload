import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import router from './router';
import http from './http';

//初始化请求配置
http.init();

createApp(App).use(ElementPlus).use(router).mount('#app');

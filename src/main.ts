import { createApp } from 'vue';
import { createPinia } from 'pinia';
import '@/styles/index.css';
import '@/styles/app.css';
import '@/styles/gauss-ui/g-desc.css';
import '@/styles/gauss-ui/g-menu.css';
import '@/styles/gauss-ui/g-divider.css';
import App from './App.vue';
import router from './router';

const container = document.getElementById('app') as HTMLDivElement;
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount(container);

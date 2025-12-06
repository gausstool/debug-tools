import { createRouter, createWebHistory } from 'vue-router';
import { tools, defaultTool } from '../domain/transform';
import { isMobile } from '@/utils';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import LayoutHome from '@/layouts/LayoutHome.vue';
import LayoutMobile from '@/layouts/LayoutMobile.vue';

NProgress.configure({ showSpinner: false });
// 动态生成路由配置
const routes = [
  { path: '', redirect: { name: defaultTool } },
  {
    path: '/mobile',
    name: 'mobile',
    component: LayoutMobile,
    meta: {
      title: '请使用桌面端浏览器访问',
    },
  },
  {
    path: '/',
    name: 'home',
    component: LayoutHome,
    children: tools
      .filter(tool => tool.component)
      .map(tool => ({
        name: tool.value,
        component: tool.component,
        path: tool.value, // 使用工具名称作为路径
      })),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (isMobile()) {
    if (to.path !== '/mobile') {
      next({ name: 'mobile' });
    } else {
      next();
    }
  } else {
    if (to.path === '/mobile') {
      next({ name: 'welcome' });
    } else {
      next();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;

import { createRouter, createWebHistory } from 'vue-router';
import { tools, defaultTool } from '../config';
import { isMobile } from '@/utils';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 动态生成路由配置
const routes = [
  { path: '', redirect: { name: defaultTool } },
  {
    path: '/mobile',
    name: 'mobile',
    component: () => import('@/views/PageMobile.vue'),
    meta: {
      title: '请使用桌面端浏览器访问',
    },
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/layouts/LayoutHome.vue'),
    children: [
      {
        path: '/',
        name: 'index',
        component: () => import('@/layouts/components/LayoutNoConsole.vue'),
        children: tools
          .filter(tool => tool.component && tool.order === 0)
          .map(tool => ({
            name: tool.value,
            component: tool.component,
            path: tool.value,
          })),
      },
      {
        path: '/',
        name: 'console',
        component: () => import('@/layouts/components/LayoutConsole.vue'),
        children: tools
          .filter(tool => tool.component && tool.order !== 0)
          .map(tool => ({
            name: tool.value,
            component: tool.component,
            path: tool.value, // 使用工具名称作为路径
          })),
      },
    ],
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

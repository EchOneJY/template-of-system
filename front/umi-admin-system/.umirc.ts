import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { exact: true, path: '/', redirect: '/dashboard' },
    {
      path: '/user',
      component: '@/layouts/UserLayout',
      routes: [{ path: '/user/login', component: '@/pages/user/login' }],
    },
    {
      path: '/',
      component: '@/layouts/BasicLayout',
      routes: [
        { path: '/dashboard', component: '@/pages/dashboard' },
        { path: '/error/403', component: '@/pages/error/403' },
        { path: '/error/404', component: '@/pages/error/404' },
        { path: '/icon/fontawesome', component: '@/pages/icons/fontawesome' },
        { path: '/icon/customer', component: '@/pages/icons/customer' },
      ],
    },
  ],
});

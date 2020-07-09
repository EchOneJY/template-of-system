import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/layout'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    name: 'Login',
    hidden: true,
    meta: { title: 'Login' }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard' }
      }
    ]
  },
  {
    path: '/icons',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons'),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icons' }
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/page-one',
    name: 'Nested',
    meta: { title: 'Nested', icon: 'nested' },
    children: [
      {
        path: 'page-one',
        component: () => import('@/views/nested/pageOne'),
        name: 'PageOne',
        meta: { title: 'PageOne' }
      },
      {
        path: 'page-two',
        component: () => import('@/views/nested/pageTwo'),
        name: 'PageTwo',
        meta: { title: 'PageTwo' }
      },
      {
        path: 'page-three',
        name: 'PageThree',
        meta: { title: 'PageThree' }

      }
    ]
  },
  {
    path: '/skeleton',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/skeleton'),
        name: 'Skeleton',
        meta: { title: 'Skeleton', icon: 'skeleton' }
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path: '/editor',
    component: Layout,
    meta: { title: 'Editor', icon: 'editor' },
    alwaysShow: true,
    children: [
      {
        path: 'markdown',
        component: () => import('@/views/editor/markdown'),
        name: 'Editor',
        meta: { title: 'Editor' }
      }
    ]
  },
  {
    path: '/authorizon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/authorizon'),
        name: 'Authorizon',
        meta: { title: 'Authorizon', icon: 'authorizon' }
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

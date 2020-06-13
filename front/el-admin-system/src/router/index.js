import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/layout'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    name: 'Login',
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
        mata: { title: 'Dashboard' }
      }
    ]
  },
  {
    path: '/icon',
    component: Layout,
    redirect: '/icon/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/icon'),
        name: 'Icon',
        mata: { title: 'Icon' }
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/page-one',
    name: 'Nested',
    children: [
      {
        path: 'page-one',
        component: () => import('@/views/nested/pageOne'),
        name: 'PageOne',
        mata: { title: 'PageOne' }
      },
      {
        path: 'page-two',
        component: () => import('@/views/nested/pageTwo'),
        name: 'PageTwo',
        mata: { title: 'PageTwo' }
      },
      {
        path: 'page-three',
        name: 'PageThree',
        children: [
          {
            path: 'page-one',
            component: () => import('@/views/nested/pageThree/pageOne'),
            name: 'PageThreeToOne',
            mata: { title: 'PageThreeToOne' }
          },
          {
            path: 'page-two',
            component: () => import('@/views/nested/pageThree/pageTwo'),
            name: 'PageThreeToTwo',
            mata: { title: 'PageThreeToTwo' }
          }
        ]
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path: '/editor',
    component: Layout,
    children: [
      {
        path: 'markdown',
        component: () => import('@/views/editor/markdown'),
        name: 'Markdown',
        mata: { title: 'Markdown', roles: ['editor'] }
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
        mata: { title: 'Athorizon', roles: ['visitor', 'editor'] }
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

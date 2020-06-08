import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/layout'

Vue.use(VueRouter)

export const constantRoutes = [
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
    name: 'Nested',
    children: [
      {
        path: 'page-one',
        component: () => import('@/views/nested/pageOne'),
        name: 'PageOne',
        mata: { title: 'PageTwo' }
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
        path: 'index',
        component: () => import('@/views/editor'),
        name: 'Editor',
        mata: { title: 'Editor', role: ['admin', 'editor'] }
      }
    ]
  }
]

const router = new VueRouter({
  routes: constantRoutes
})

export default router

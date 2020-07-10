import {
  DashboardOutlined,
  FileWordOutlined,
  WarningOutlined,
  RetweetOutlined
} from '@ant-design/icons'

import Loadable from '@/utils/loadable'

export const BasicPageRoutes = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: DashboardOutlined,
    component: Loadable(() => import('@/pages/dashboard'))
  },
  {
    path: '/editor',
    title: 'Editor',
    icon: FileWordOutlined,
    children: [
      {
        path: '/editor/braft',
        title: 'Braft',
        component: Loadable(() => import('@/pages/editor/braft'))
      },
      {
        path: '/editor/mde',
        title: 'Mde',
        component: Loadable(() => import('@/pages/editor/mde'))
      }
    ]
  },
  {
    path: '/error',
    title: 'Error',
    icon: WarningOutlined,
    children: [
      {
        path: '/error/403',
        title: '403',
        component: Loadable(() => import('@/pages//error/403'))
      },
      {
        path: '/error/404',
        title: '404',
        component: Loadable(() => import('@/pages//error/404'))
      }
    ]
  },
  {
    path: '/redux',
    title: 'Redux',
    icon: RetweetOutlined,
    children: [
      {
        path: '/redux/redux',
        title: 'redux',
        component: Loadable(() => import('@/pages//redux/redux'))
      },
      {
        path: '/redux/react_redux',
        title: 'react-redux',
        component: Loadable(() => import('@/pages//redux/react-redux'))
      },
      {
        path: '/redux/redux_thunk',
        title: 'redux-thunk',
        component: Loadable(() => import('@/pages//redux/redux-thunk'))
      },
      {
        path: '/redux/redux_saga',
        title: 'redux-saga',
        component: Loadable(() => import('@/pages//redux/redux-saga'))
      },
      {
        path: '/redux/my_redux',
        title: 'my-redux'
      }
    ]
  }
]

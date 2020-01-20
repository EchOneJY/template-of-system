import article from './modules/article'
import test from './modules/test'

export interface MenuType {
  key: string
  title: string
  icon: string
  type?: string
  children?: any[]
} 

// 菜单 顶栏
export const menuHeader = [{
    key: '/home',
    title: '首页',
    icon: 'home',
    type: 'home'
  },
  {
    key: '/blog',
    title: '博客',
    icon: 'instagram',
    children: article
  },
  {
    key: '/test',
    title: '测试',
    icon: 'appstore',
    children: test
  }
]
   
// 菜单 侧边栏
export const menuAside = [
  ...article,
  ...test
]


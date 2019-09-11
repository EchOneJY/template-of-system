/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 09:38:46
 * @LastEditTime: 2019-08-14 17:55:12
 * @LastEditors: EchOne
 */
import Home from '../pages/home'
import ArticleList from '../pages/article/List'
import ArticleAdd from '../pages/article/Add.js'
import ArticleDetail from '../pages/article/Detail.js'
import CategoryList from '../pages/category/List'
import TagsList from '../pages/tags/List'
import ButonCustom from '../pages/ui/Button'
import AlertCustom from '../pages/ui/Alert'
import BraftEditor from '../pages/editors/BraftEditor.js'
import ReactMde from '../pages/editors/ReactMde.js'

let routes = [
    {
        path:'/home',
        component: Home,
    },
    {
        path:'/article/list',
        component: ArticleList,
    },
    {
        path:'/article/add',
        component: ArticleAdd,
    },
    {
        path:'/article/detail/:id',
        component: ArticleDetail,
    },
    {
        path:'/category/list',
        component: CategoryList,
    },
    {
        path:'/tags/list',
        component: TagsList,
    },
    {
        path:'/ui/button',
        component: ButonCustom,
    },
    {
        path:'/ui/alert',
        component: AlertCustom,
    },
    {
        path:'/editor/braft',
        component: BraftEditor,
    },
    {
        path:'/editor/mde',
        component: ReactMde,
    },
  ]

  export default routes;
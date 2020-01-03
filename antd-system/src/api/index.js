/*
 * @Author: EchOne
 * @Date: 2019-08-15 09:36:43
 * @LastEditors: EchOne
 * @LastEditTime: 2019-08-15 10:11:04
 * @Description: 接口模块封装
 */

import fetchData from './axios'
//登录
export const reqLogin = data => fetchData('/login',data)
//验证码
export const getCaptcha = () => fetchData('/captcha')


//查找分类列表
export const queryCategory = () => fetchData('/categories/list')
//添加分类
export const addCategory = data => fetchData('/category/add',data)
//删除分类
export const deleteCategory = data => fetchData('/categories/delete',data)
//更新分类
export const updateCategory = data => fetchData('/category/update',data)


//查找标签列表
export const getTagsList = data => fetchData('/tags/list',data)
//添加标签
export const addTags = data => fetchData('/tags/add',data)
//添加默认标签
export const addDefaultTags = data => fetchData('/tags/add/default',data)
//删除标签
export const deleteTags = data => fetchData('/tags/delete',data)
//更新标签
export const updateTag = data => fetchData('/tag/update',data)


//查询文章列表
export const queryArticleList = data => fetchData('/article/list',data)
//添加文章
export const addArticle = data => fetchData('/article/add',data)
//删除文章
export const deleteArticle = data => fetchData('/article/delete',data)
//更新文章
export const updateArticle = data => fetchData('/article/update',data)
//改变置顶
export const changeTop = data => fetchData('/article/change/top',data)
//改变可见
export const changePrivate = data => fetchData('/article/change/private',data)

//redux列表查询
export const queryTodoList = () => fetchData('/redux/test')
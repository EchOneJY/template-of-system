/*
 * @Author: EchOne
 * @Date: 2018-10-23 09:34:18
 * @LastEditors: EchOne
 * @LastEditTime: 2018-10-23 09:34:18
 * @Description: file content
 */
'use strict';
const fs = require('fs'); //引入文件读取模块

const express = require('express');
const router = express.Router();
const Api =  require('../controller/api');

/* GET home page. */
router.post('/article/list', Api.getArticleList);
router.post('/article/search', Api.searchArticle);
router.post('/article/detail', Api.getArticleDetail);
router.post('/article/add', Api.addArticle);
router.post('/article/update', Api.updateArticle);
router.post('/article/delete', Api.deleteArticle);
router.post('/article/change/private', Api.changePrivate);
router.post('/article/change/top', Api.changeTop);
router.post('/upload/headview', Api.uploadHeadView);
router.post('/upload/audio', Api.uploadAudio);
router.post('/tags/add', Api.addTags);
router.post('/tags/list', Api.getTagsList);
router.post('/tag/update', Api.updateTag);
router.post('/tags/add/default', Api.addDefaultTags);
router.post('/tags/delete', Api.deleteTags);
router.post('/categories/list', Api.getCategoriesList);
router.post('/category/add', Api.addCategory);
router.post('/category/update', Api.updateCategory);
router.post('/categories/delete', Api.deleteCategories);
router.post('/user/add', Api.addUserInfo);
router.post('/user/detail', Api.getUserInfo);
router.post('/user/update', Api.updateUserInfo);
router.post('/pwd/detect', Api.detectPwd);
router.post('/captcha', Api.getCaptcha);
router.post('/login', Api.login);
router.post('/delete/file', Api.deleteFile);



module.exports = router;
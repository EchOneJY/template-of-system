/*
 * @Author: EchOne
 * @Date: 2018-11-21 09:29:02
 * @LastEditors: EchOne
 * @LastEditTime: 2019-08-15 12:01:50
 * @Description: file content
 */
'use strict'
const fs = require('fs') //引入文件读取模块
const path = require('path')
const models = require('../models/db')
const mongoose = require('mongoose')
const utils = require('./utils')
const formidable = require('formidable')
const bcrypt = require('bcryptjs')
const svgCaptcha = require('svg-captcha')

// 获取数据
const execCallback = function(p, err, data, res) {
  if (err) {
    res.send(err)
  } else {
    //再次查询，获取总数
    p.find().countDocuments((err, result) => {
      if (err) {
        res.send({
          code: 0,
          data: '',
          msg: err,
          count: ''
        })
      } else {
        res.send({
          code: 1,
          data: data,
          msg: 'success',
          count: result
        })
      }
    })
  }
}

// 更新和保存用户信息回调
const callback = function(err, data, res) {
  if (err) {
    res.send({
      code: 0,
      data: '',
      msg: err
    })
  } else {
    res.send({
      code: 1,
      data: data,
      msg: 'success'
    })
  }
}

module.exports = {
  reduxTestList: (req, res) => {
    const type = req.body.type
    switch (type) {
      case '00':
        callback(null, ['Hello Redux', 'Learning It!'], res)
        break
      case '01':
        callback(null, ['Hello React-Redux', 'Learning It!'], res)
        break
      case '02':
        callback(null, ['Hello Redux-Thunk', 'Learning It!'], res)
        break
      case '03':
        callback(null, ['Hello Redux-Saga', 'Learning It!'], res)
        break
      default:
        callback(null, ['Hello Redux', 'Learning It!'], res)
    }
  },
  deleteFile: (req, res) => {
    const file_name = req.body.file_name
    const type = {
      img: '../static/imgs/',
      audio: '../static/audio/'
    }
    if (file_name) {
      fs.unlink(path.join(__dirname, type[req.body.type], file_name), err => {
        callback(err, null, res)
      })
    }
  },
  getArticleList: (req, res) => {
    const p = models.articles
    p.find({})
      .sort({
        top: 1
      })
      .exec((err, docs) => {
        let pageSize = req.body.pageSize
        let currentPage = req.body.currentPage
        // 求出当前页的起始文章位置
        let articleIndex = (currentPage - 1) * pageSize
        // 截取要显示的文章数据
        let perPageDatas = docs.slice(
          Number(articleIndex),
          Number(articleIndex) + Number(pageSize)
        )
        for (let data of perPageDatas) {
          data.content = data.content.split('<!--more-->')[0]
        }
        execCallback(p, err, perPageDatas, res)
      })
  },
  getArticleDetail: (req, res) => {
    const id = req.body.id
    const p = models.articles
    p.findOne(
      {
        _id: id
      },
      (err, data) => {
        callback(err, data, res)
      }
    )
  },
  deleteArticle: (req, res) => {
    const id = req.body.id.split(',')
    const p = models.articles
    p.deleteMany(
      {
        _id: id
      },
      function(err, data) {
        callback(err, data, res)
      }
    )
  },
  addArticle: (req, res) => {
    const id = mongoose.Types.ObjectId()
    const p = models.articles
    const createTime = utils.formatDate(new Date(), 1)
    p.create(
      {
        _id: id,
        content: req.body.content,
        title: req.body.title,
        datetime: createTime,
        tags: req.body.tags,
        categories: req.body.categories,
        top: req.body.top,
        private: req.body.private
      },
      function(err, data) {
        callback(err, data, res)
      }
    )
  },
  updateArticle: (req, res) => {
    const p = models.articles
    p.updateOne(
      {
        _id: req.body.id
      },
      {
        content: req.body.content,
        title: req.body.title,
        tags: req.body.tags,
        categories: req.body.categories,
        top: req.body.top,
        private: req.body.private
      },
      (err, data) => {
        callback(err, data, res)
      }
    )
  },
  searchArticle: (req, res) => {
    const p = models.articles
    const query = req.body.search
    const typeObj = {
      '00': {
        title: {
          $regex: query,
          $options: '$i'
        }
      },
      '01': {
        categories: {
          $regex: query,
          $options: '$i'
        }
      },
      '02': {
        tags: {
          $regex: query,
          $options: '$i'
        }
      }
    }

    function test(e) {
      return typeObj[e] || ''
    }
    const type = test(req.body.type)
    p.find(type)
      .sort({
        top: 1
      })
      .exec((err, docs) => {
        let pageSize = req.body.pageSize
        let currentPage = req.body.currentPage
        // 求出当前页的起始文章位置
        let articleIndex = (currentPage - 1) * pageSize
        // 截取要显示的文章数据
        let perPageDatas = docs.slice(
          Number(articleIndex),
          Number(articleIndex) + Number(pageSize)
        )
        for (let data of perPageDatas) {
          data.content = data.content.split('<!--more-->')[0]
        }
        execCallback(p, err, perPageDatas, res)
      })
  },
  changePrivate: (req, res) => {
    const p = models.articles
    p.updateOne(
      {
        _id: req.body.id
      },
      {
        private: req.body.isPrivate
      },
      function(err, data) {
        execCallback(p, err, data, res)
      }
    )
  },
  changeTop: (req, res) => {
    const p = models.articles
    p.updateOne(
      {
        _id: req.body.id
      },
      {
        top: req.body.isTop
      },
      function(err, data) {
        execCallback(p, err, data, res)
      }
    )
  },
  uploadHeadView: (req, res) => {
    res.header('Content-Type', 'text/javascript;charset=utf-8') //设置返回字符串编码
    var form = new formidable.IncomingForm() //创建对象
    form.uploadDir = './my-blog-node/static/imgs/' //设置临时文件存放的路径
    form.encoding = 'utf-8' //设置上传数据的编码
    form.keepExtensions = true //设置是否保持上传文件的拓展名
    form.maxFieldsSize = 2 * 1024 * 1024 //文件大小

    form.parse(req, function(err, fields, files) {
      if (err) {
        res.render('index', {
          title: err
        })
        return
      }

      var extName = '' //后缀名
      switch (files.uploadHeadView.type) {
        case 'image/pjpeg':
          extName = 'jpg'
          break
        case 'image/jpeg':
          extName = 'jpg'
          break
        case 'image/png':
          extName = 'png'
          break
        case 'image/x-png':
          extName = 'png'
          break
        case 'image/gif':
          extName = 'gif'
          break
      }

      if (extName.length == 0) {
        res.send('上传文件类型有误！')
        return
      }

      var avatarName = Date.parse(new Date()) + '.' + extName
      var newPath = form.uploadDir + avatarName

      fs.renameSync(files.uploadHeadView.path, newPath) //重命名
      res.send(avatarName)
    })
  },
  uploadAudio: (req, res) => {
    res.header('Content-Type', 'text/javascript;charset=utf-8') //设置返回字符串编码
    var form = new formidable.IncomingForm() //创建对象
    form.uploadDir = './my-blog-node/static/audio/' //设置临时文件存放的路径
    form.encoding = 'utf-8' //设置上传数据的编码
    form.keepExtensions = true //设置是否保持上传文件的拓展名
    form.maxFieldsSize = 10 * 1024 * 1024 //文件大小
    form.parse(req, function(err, fields, files) {
      if (err) {
        res.render('index', {
          title: err
        })
        return
      }

      var avatarName = Date.parse(new Date()) + '.mp3'
      var newPath = form.uploadDir + avatarName

      fs.renameSync(files.uploadAudio.path, newPath) //重命名

      res.send(avatarName)
    })
  },
  getTagsList: (req, res) => {
    const p = models.tags
    p.find({})
      .sort({
        top: 1
      })
      .exec((err, docs) => {
        execCallback(p, err, docs, res)
      })
  },
  updateTag: (req, res) => {
    const p = models.tags
    p.updateOne(
      {
        _id: req.body.id
      },
      {
        name: req.body.name,
        top: req.body.top
      },
      (err, data) => {
        callback(err, data, res)
      }
    )
  },
  addDefaultTags: (req, res) => {
    const p = models.tags
    let tagArr = [
      'html',
      'css',
      'javaScript',
      'jQuery',
      'vue',
      'webpack',
      'React',
      'NodeJS',
      'Angular'
    ]
    let tags = []
    for (let idx in tagArr) {
      let tagObj = {}
      tagObj._id = mongoose.Types.ObjectId()
      tagObj.name = tagArr[idx]
      tags.push(tagObj)
    }
    p.create(tags, function(err, data) {
      execCallback(p, err, data, res)
    })
  },
  addTags: (req, res) => {
    const p = models.tags
    let tags = []
    if (req.body.top) {
      let tagObj = {}
      tagObj._id = mongoose.Types.ObjectId()
      tagObj.name = req.body.name
      tagObj.top = req.body.top
      tags.push(tagObj)
    } else {
      let tagArr = req.body.tags.split(',')
      for (let idx in tagArr) {
        let tagObj = {}
        tagObj._id = mongoose.Types.ObjectId()
        tagObj.name = tagArr[idx]
        tags.push(tagObj)
      }
    }
    p.create(tags, (err, docs) => {
      callback(err, docs, res)
    })
  },
  deleteTags: (req, res) => {
    const id = req.body.id.split(',')
    const p = models.tags
    p.deleteMany(
      {
        _id: id
      },
      function(err, data) {
        callback(err, data, res)
      }
    )
  },
  getCategoriesList: (req, res) => {
    const p = models.categories
    p.find({})
      .sort({
        top: 1
      })
      .exec((err, docs) => {
        execCallback(p, err, docs, res)
      })
  },
  updateCategory: (req, res) => {
    const p = models.categories
    p.updateOne(
      {
        _id: req.body.id
      },
      {
        name: req.body.name,
        top: req.body.top
      },
      (err, data) => {
        callback(err, data, res)
      }
    )
  },
  addCategory: (req, res) => {
    const p = models.categories
    let categoryObj = {
      _id: mongoose.Types.ObjectId(),
      name: req.body.name,
      top: req.body.top
    }
    p.create(categoryObj, (err, docs) => {
      callback(err, docs, res)
    })
  },
  deleteCategories: (req, res) => {
    const id = req.body.id.split(',')
    const p = models.categories
    p.deleteMany(
      {
        _id: id
      },
      function(err, data) {
        callback(err, data, res)
      }
    )
  },
  addUserInfo: (req, res) => {
    const id = mongoose.Types.ObjectId()
    const p = models.users
    let password = req.body.password
    //生成salt的迭代次数
    const saltRounds = 10
    //生成salt并获取hash值
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        //把hash值赋值给password变量
        password = hash
        storeUInfo()
      })
    })

    function storeUInfo() {
      let user = {
        _id: id,
        name: req.body.name,
        password: password,
        sign: req.body.sign,
        headview: req.body.headview,
        headview_name: req.body.headviewName,
        audio: req.body.audio,
        audio_name: req.body.audioName,
        link: req.body.link.split(','),
        link_name: req.body.linkName.split(',')
      }
      p.create(user, function(err, data) {
        callback(err, data, res)
      })
    }
  },
  getUserInfo: (req, res) => {
    const name = req.body.name
    const p = models.users
    p.findOne(
      {
        name: name
      },
      (err, data) => {
        callback(err, data, res)
      }
    )
  },
  updateUserInfo: (req, res) => {
    const p = models.users
    p.updateOne(
      {
        name: req.body.name
      },
      {
        sign: req.body.sign,
        headview: req.body.headview,
        headview_name: req.body.headviewName,
        headview_res: req.body.headviewRes,
        audio: req.body.audio,
        audio_name: req.body.audioName,
        audio_res: req.body.audioRes,
        link: req.body.link,
        link_name: req.body.linkName
      },
      (err, data) => {
        callback(err, data, res)
      }
    )
  },
  detectPwd: (req, res) => {
    const p = models.users
    const name = req.body.name
    const password = req.body.password
    p.findOne(
      {
        name: name
      },
      (err, data) => {
        bcrypt.compare(password, data.password, function(error, result) {
          if (err) {
            res.send({
              code: 0,
              msg: err
            })
          } else {
            if (result) {
              res.send({
                code: 2,
                msg: '新密码与原密码相同'
              })
            } else {
              res.send({
                code: 1,
                msg: '密码修改成功'
              })
            }
          }
        })
      }
    )
  },
  getCaptcha: (req, res) => {
    var codeConfig = {
      ignoreChars: '0o1i', // 验证码字符中排除 0o1i
      width: 85,
      height: 34
    }
    const cap = svgCaptcha.create(codeConfig)
    req.session.captcha = cap.text
    res.send(cap.data)
  },
  login: (req, res) => {
    const p = models.users
    let { username, password, code } = req.body

    // 判断验证码是否正确
    if (!checkCaptcha(code)) {
      res.send({
        code: 0,
        msg: '验证码错误'
      })
      return
    }

    // 查询用户信息
    p.findOne(
      {
        name: username
      },
      (err, data) => {
        // 若用户不存在注册该用户信息并登陆
        if (!data) {
          //生成salt的迭代次数
          const saltRounds = 10
          //生成salt并获取hash值
          bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
              //把hash值赋值给password变量
              password = hash
              storeUInfo()
            })
          })

          function storeUInfo() {
            let user = {
              _id: mongoose.Types.ObjectId(),
              name: username,
              password: password
            }
            p.create(user, function(err, data) {
              res.send({
                code: 1,
                msg: '注册并登录成功',
                data: {
                  uuid: user._id,
                  username: user.name,
                  token:
                    'd787syv8dys8cas80d9s0a0d8f79ads56f7s4d56f879a8as89fd980s7dg'
                }
              })
              return
            })
          }
          return
        }
        // 用户存在，判断登录密码是否一致
        bcrypt.compare(password, data.password, function(error, result) {
          if (result) {
            res.send({
              code: 2,
              msg: '登录成功',
              data: {
                uuid: data._id,
                username: username,
                token:
                  'd787syv8dys8cas80d9s0a0d8f79ads56f7s4d56f879a8as89fd980s7dg'
              }
            })
          } else {
            res.send({
              code: 3,
              msg: '密码错误'
            })
          }
        })
      }
    )

    // 检查验证码是否正确
    function checkCaptcha(code) {
      code = code.toLowerCase()
      let sessCode = req.session.captcha
        ? req.session.captcha.toLowerCase()
        : null // 拿到之前存在session中的验证码
      // 进行验证
      if (code === sessCode) {
        // 成功后验证码作废
        req.session.captcha = null
      }
      return code === sessCode
    }
  }
}

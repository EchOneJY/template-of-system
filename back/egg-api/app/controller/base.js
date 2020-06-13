'use strict'

const Controller = require('egg').Controller

class BaseController extends Controller {
  success(data, msg) {
    this.ctx.body = {
      code: 100,
      data,
      message: msg,
    }
  }
  message(msg) {
    this.ctx.body = {
      code: 100,
      message: msg,
    }
  }
  error(msg, code = 999) {
    this.ctx.body = {
      code,
      message: msg,
    }
  }
}

module.exports = BaseController

'use strict'

const Controller = require('egg').Controller

class BaseController extends Controller {
  success(data, msg) {
    this.ctx.body = {
      code: 0,
      data,
      message: msg,
    }
  }
  message(msg) {
    this.ctx.body = {
      code: 0,
      message: msg,
    }
  }
  error(msg, code = -1) {
    this.ctx.body = {
      code,
      message: msg,
    }
  }
}

module.exports = BaseController

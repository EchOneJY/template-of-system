'use strict'

const BaseController = require('./base')
const routes = require('../moker/routes.json')

class HomeController extends BaseController {
  async match() {
    const { ctx } = this
    const role = ctx.params.role
    const result = []
    routes.forEach(route => {
      if (route.roles.includes(role)) {
        result.push(route.name)
      }
    })
    this.success(result)
  }
}

module.exports = HomeController

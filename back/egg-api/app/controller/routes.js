'use strict'

const BaseController = require('./base')
const routes = require('../moker/routes.json')

class HomeController extends BaseController {
  async match() {
    const { ctx } = this
    const roles = ctx.query.roles.split('-')
    const result = []
    routes.forEach(route => {
      for(const role of roles) {
        if (route.roles.includes(role)) {
          result.push(route.name)
          break
        }
      }
    })
    this.success(result)
  }
}

module.exports = HomeController

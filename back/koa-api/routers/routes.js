const Router = require('koa-router')
const router = new Router()

const routes = require('../moker/routes.json')

router.get('/match/:role', async ctx => {
  const role = ctx.params.role
  const result = []
  routes.forEach(route => {
    if (route.roles.includes(role)) {
      result.push(route.name)
    }
  })
  ctx.body = {
    code: 1,
    data: result,
    msg: 'success'
  }
})

module.exports = router

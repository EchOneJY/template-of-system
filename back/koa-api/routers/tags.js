const Router = require('koa-router')
const router = new Router()

const models = require('../database/db')

router.get('/list', async ctx => {
  console.log(ctx.request.body)
  const p = models.tags
  const tags = await p
    .find({})
    .sort({
      top: 1
    })
    .exec()
  ctx.body = {
    code: 1,
    data: tags,
    msg: 'success'
  }
})

module.exports = router

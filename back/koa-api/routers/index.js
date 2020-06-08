const router = require('koa-router')()

const tags = require('./tags')
const routes = require('./routes')

router.use('/tags', tags.routes(), tags.allowedMethods())
router.use('/routes', routes.routes(), routes.allowedMethods())

module.exports = router

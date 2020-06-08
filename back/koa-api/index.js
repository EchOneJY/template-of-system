const Koa = require('koa')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const router = require('./routers')

const app = new Koa()

app.use(cors())

app.use(bodyParser())

//配置路由
app.use(router.routes()) //启动路由
app.use(router.allowedMethods())

app.listen(5000, () => {
  console.log('[Server] starting at port 5000')
})

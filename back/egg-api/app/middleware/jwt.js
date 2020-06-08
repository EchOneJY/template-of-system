module.exports = ({ app }) => {
  return async function verify(ctx, next) {
    const token = ctx.request.header.authorization.replace('Bearer ', '')
    try {
      const res = await app.jwt.verify(token, app.config.jwt.secret)
      ctx.state.username = res.name
      ctx.state.userid = res._id
      await next()
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return (ctx.body = {
          code: -666,
          message: '登陆已过期',
        })
      }
      console.log(err)
    }
  }
}

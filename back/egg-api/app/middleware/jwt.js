module.exports = ({ app }) => {
  return async function verify(ctx, next) {
    const token = ctx.request.header.authorization.replace('Bearer ', '')
    try {
      const res = await app.jwt.verify(token, app.config.jwt.secret)
      ctx.state.username = res.name
      ctx.state.userid = res._id
      ctx.state.token = token

      await next()
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return (ctx.body = {
          code: 401,
          message: '登陆已过期',
        })
      }
    }
  }
}

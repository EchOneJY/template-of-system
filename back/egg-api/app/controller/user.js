'use strict'

const BaseController = require('./base')
const md5 = require('md5')

const HashSalt = '11111'

class UserController extends BaseController {
  async info() {
    const { ctx } = this
    const { userid: _id='',token='' } = ctx.state
    const user = await this.ctx.model.User.findOne({ $or: [{_id}, {token}]})
    this.success(user)
  }

  async captcha() {
    const { ctx } = this
    const captcha = this.service.tools.captcha()
    ctx.session.captcha = captcha.text
    ctx.response.type = 'image/svg+xml'
    ctx.body = captcha.data
  }

  async login() {
    const { ctx, app } = this
    const { captcha, username: name, password,role } = ctx.request.body
    if (captcha.toUpperCase() === ctx.session.captcha.toUpperCase()) {
      const hasName = await this.ctx.model.User.findOne({ name,role })
      if (hasName == null) {
        await ctx.model.User.create({
          name,
          password: md5(password + HashSalt),
          role
        })
      }
      const isUser = await this.ctx.model.User.findOne({
        name,
        password: md5(password + HashSalt),
        role
      })

      if (isUser) {
        const token = app.jwt.sign(
          {
            name,
            role,
            _id: isUser._id,
          },
          app.config.jwt.secret,
          {
            expiresIn: '1h',
          }
        )
        this.success({ token, name, role })
      } else {
        this.error('用户名密码错误')
      }
    } else {
      this.error('验证码错误')
    }
  }
  async isFollow() {
    const { ctx } = this
    const me = await ctx.model.User.findById(ctx.state.userid)
    const isFollow = !!me.following.find(v => v.toString() == ctx.params.id)
    this.success({ isFollow })
  }
  async follow() {
    const { ctx } = this
    const me = await ctx.model.User.findById(ctx.state.userid)
    const isFollow = !!me.following.find(v => v.toString() == ctx.params.id)
    if (!isFollow) {
      me.following.push(ctx.params.id)
      me.save()
      this.message('关注成功')
    }
  }
  async unfollow() {
    const { ctx } = this
    const me = await ctx.model.User.findById(ctx.state.userid)
    const index = me.following.map(id => id.toString()).indexOf(ctx.params.id)
    if (index > -1) {
      me.following.splice(index, 1)
      me.save()
      this.success('取消成功')
    }
  }
  async following() {
    const { ctx } = this
    const users = await ctx.model.User.findById(ctx.params.id).populate(
      'following'
    )
    this.success(users.following)
  }
  async follower() {
    const { ctx } = this
    const users = await ctx.model.User.find({ following: ctx.params.id })
    this.success(users)
  }

  async articleStatus() {
    const { ctx } = this
    const me = await ctx.model.User.findById(ctx.state.userid)
    console.log(me)
    const like = !!me.likeArticle.find(id => id.toString() == ctx.params.id)
    this.success({ like })
  }

  async likeArticle() {
    const { ctx } = this
    const me = await ctx.model.User.findById(ctx.state.userid)
    const like = me.likeArticle.find(id => id.toString() == ctx.params.id)
    if (!like) {
      me.likeArticle.push(ctx.params.id)
      me.save()
      await ctx.model.Article.findByIdAndUpdate(ctx.params.id, {
        $inc: { like: 1 },
      })
      return this.message('点赞成功')
    } else {
      return this.message('已经点赞')
    }
  }

  async cancelLikeArticle() {
    const { ctx } = this
    const me = await ctx.model.User.findById(ctx.state.userid)
    const index = me.likeArticle.map(id => id.toString()).indexOf(ctx.params.id)
    if (index > -1) {
      me.likeArticle.splice(index, 1)
      me.save()
      await ctx.model.Article.findByIdAndUpdate(ctx.params.id, {
        $inc: { like: -1 },
      })
      return this.message('取消成功')
    }
  }
}

module.exports = UserController

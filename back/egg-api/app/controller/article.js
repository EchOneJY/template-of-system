const BaseController = require('./base')
const marked = require('marked')

class ArticleController extends BaseController {
  async list() {
    const { ctx } = this
    const res = await ctx.model.Article.find().populate('author')
    this.success(res)
  }
  async create() {
    const { ctx } = this
    const { userid } = ctx.state
    const { content } = ctx.request.body
    let title = content.split('\n').find(v => {
      return v.indexOf('# ') === 0
    })
    const obj = {
      title: title.replace('# ', ''),
      article: content,
      article_html: marked(content),
      author: userid,
    }
    const res = await ctx.model.Article.create(obj)
    if (res._id) {
      this.success({
        id: res._id,
        title: obj.title,
      })
    } else {
      this.error('创建失败')
    }
  }
  async detail() {
    const { ctx } = this
    const { id } = ctx.params
    const info = await ctx.model.Article.findOneAndUpdate(
      { _id: id },
      { $inc: { views: 1 } }
    ).populate('author')
    this.success(info)
  }
}

module.exports = ArticleController

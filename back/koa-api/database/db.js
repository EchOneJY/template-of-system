const mongoose = require('mongoose')

const { connect } = require('./init')
connect()
// 创建Schema对象
const Schema = mongoose.Schema

/**
 * article表
 */

const articlesSchema = new Schema({
  _id: Schema.Types.ObjectId,
  content: String,
  title: String,
  datetime: String,
  tags: String,
  categories: String,
  top: {
    type: String,
    default: '01'
  },
  private: {
    type: Boolean,
    default: false
  }
})

/**
 * tags 表
 */
const tagsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  isChecked: {
    type: Boolean,
    default: false
  },
  top: {
    type: String,
    default: '01'
  }
})

/**
 * categories 表
 */
const categorySchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  top: {
    type: String,
    default: '01'
  }
})

/**
 * usere表
 */
const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, unique: true },
  password: String,
  headview: String,
  headview_name: String,
  headview_res: String,
  sign: String,
  audio: String,
  audio_name: String,
  audio_res: String,
  link: String,
  link_name: String
})

/**
 * 编译模型： model(name, [schema], [colleciton], [skipInit] )
   参数： name ：标识model的字符串
　　     schema: 即前面定义的Schema对象
　　 collection：要连接的集合名称（如果在Schema对象中没有指定一个集合）
　　 skipInit： 默认为false，如果为true，则跳过初始化过程，创建一个没有连接到数据库的一个简单的Model对象。
 */
const Models = {
  users: mongoose.model('users', userSchema),
  articles: mongoose.model('articles', articlesSchema),
  tags: mongoose.model('tags', tagsSchema),
  categories: mongoose.model('categories', categorySchema)
}

module.exports = Models

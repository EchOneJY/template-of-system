const mongoose = require('mongoose')
const db = 'mongodb://localhost/my_blog'

// const glob = require('glob')
// const { resolve } = require('path')
mongoose.Promise = global.Promise

exports.connect = () => {
  mongoose.connect(db, { useNewUrlParser: true })

  let maxConnectTimes = 0

  return new Promise((resolve, reject) => {
    mongoose.connection.on('disconnected', () => {
      console.log('***********数据库断开***********')
      if (maxConnectTimes < 3) {
        maxConnectTimes++
        mongoose.connect(db)
      } else {
        reject()
        throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
      }
    })

    mongoose.connection.on('error', err => {
      console.log('***********数据库错误***********')
      if (maxConnectTimes < 3) {
        maxConnectTimes++
        mongoose.connect(db)
      } else {
        reject(err)
        throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
      }
    })

    mongoose.connection.once('open', () => {
      console.log('MongoDB Connected successfully!')
      resolve()
    })
  })
}

// exports.initSchemas = () => {
//   glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)
// }

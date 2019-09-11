'use strict'
const fs = require('fs'); //引入文件读取模块
const path = require('path');

const mongoose = require("mongoose");

// 连接数据库
mongoose.connect('mongodb://localhost/my_blog', {
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', () => {
  console.log("连接失败!");
});
db.once('open', () => {
  console.log("连接成功！")
});

// db.once('close', () => {
//     console.log("数据库断开成功！")
// });

// 创建Schema对象
const Schema = mongoose.Schema;

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
  },
});

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
});

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
});

/**
 * usere表
 */
const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {type:String,unique:true},
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
});


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


// let flag = true;

// function addTags() {
//   if (flag) {
//     let tagArr = ["html", "css", "javaScript", "jQuery", "vue", "webpack", "React", "NodeJS", "Angular"]
//     let tags = [];
//     for (let idx in tagArr) {
//       let tagObj = {};
//       tagObj._id = mongoose.Types.ObjectId();
//       tagObj.name = tagArr[idx];
//       tags.push(tagObj)
//     }
//     Models.tags.create(tags, (err) => {
//       if (err) {
//         throw err;
//       } else {
//         console.log("插入成功");
//       }
//     })
//   }
//   flag = false;
// }
// addTags();

module.exports = Models;

// 创建Model对象
// let articleIndexModel = mongoose.model("article_index", articleIndexSchema);

// let content = [{
//     "articleContent": '',
//     "articleId": "1",
//     "articleTitle": "啃书笔记（一）——《JavaScript-DOM编程艺术》",
//     "articleDate": "2017-10-29",
//     "articleTags": [{
//         "articleTagName": "JavaScript"
//       },
//       {
//         "articleTagName": "DOM"
//       },
//       {
//         "articleTagName": "笔记"
//       }
//     ],
//     "articleCategories": [{
//       "articleCategoryName": "JavaScript"
//     }]
//   },
//   {
//     "articleContent": '',
//     "articleId": "2",
//     "articleTitle": "啃书笔记（二）——《JavaScript高级程序设计》",
//     "articleDate": "2017-11-06",
//     "articleTags": [{
//         "articleTagName": "JavaScript"
//       },
//       {
//         "articleTagName": "笔记"
//       }
//     ],
//     "articleCategories": [{
//       "articleCategoryName": "JavaScript"
//     }]
//   },
//   {
//     "articleContent": '',
//     "articleId": "3",
//     "articleTitle": "手把手教你用原生JavaScript造轮子（1）——分页器",
//     "articleDate": "2018-07-22",
//     "articleTags": [{
//         "articleTagName": "轮子"
//       },
//       {
//         "articleTagName": "JavaScript"
//       },
//       {
//         "articleTagName": "分页"
//       },
//       {
//         "articleTagName": "Vue"
//       },
//       {
//         "articleTagName": "Webpack"
//       },
//       {
//         "articleTagName": "ECMAScript6"
//       }
//     ],
//     "articleCategories": [{
//         "articleCategoryName": "JavaScript"
//       },
//       {
//         "articleCategoryName": "Vue"
//       },
//       {
//         "articleCategoryName": "Webpack"
//       },
//       {
//         "articleCategoryName": "ECMAScript6"
//       }
//     ]
//   },
//   {
//     "articleContent": '',
//     "articleId": "4",
//     "articleTitle": "手把手教你用原生JavaScript造轮子（2）——轮播图",
//     "articleDate": "2018-08-10",
//     "articleTags": [{
//         "articleTagName": "轮子"
//       },
//       {
//         "articleTagName": "JavaScript"
//       },
//       {
//         "articleTagName": "轮播图"
//       },
//       {
//         "articleTagName": "Vue"
//       },
//       {
//         "articleTagName": "Webpack"
//       },
//       {
//         "articleTagName": "ECMAScript6"
//       }
//     ],
//     "articleCategories": [{
//         "articleCategoryName": "JavaScript"
//       },
//       {
//         "articleCategoryName": "Vue"
//       },
//       {
//         "articleCategoryName": "Webpack"
//       },
//       {
//         "articleCategoryName": "ECMAScript6"
//       }
//     ]
//   }
// ]

// var fileDirectory = path.join(__dirname, './articles');
// // 判断文件夹路径是否存在
// if (fs.existsSync(fileDirectory)) {
//   fs.readdir(fileDirectory, function (err, files) {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     var completedCount = 0;
//     files.forEach((filename, index) => {
//       let file_path = path.join(fileDirectory, filename);
//       fs.readFile(file_path, (err, data) => {
//         if (err) throw err;
//         content[index].articleContent = data.toString();
//         completedCount++;
//         if (completedCount === content.length) {
//           // // 插入文档
//           articleIndexModel.create(content, (err) => {
//             if (!err) {
//               console.log("插入成功");
//             } else {
//               throw err;
//             }
//           })
//         }

//       });
//     });
//   });
// } else {
//   console.log(fileDirectory + "  Not Found!");
// }





// 查询
// personModel.find({},(err,docs)=>{
//     if(!err){
//         console.log(docs);
//     }
// })

// personModel.find({name:"yisan"},(err,docs)=>{
//     if(!err){
//         console.log(docs);
//     }
// })

// 

// personModel.find({},"-_id name sex",(err,docs)=>{
//     if(!err){
//         console.log(docs);
//     }
// })

// personModel.find({},"-_id name sex",{skip:3,limit:4},(err,docs)=>{
//     if(!err){
//         console.log(docs);
//     }
// })

// 修改
// personModel.update({name:"yiyi"},{$set:{age:0}},(err,docs)=>{
//     if(!err){
//         console.log("修改成功");
//         console.log(docs);
//     }else{
//         throw err
//     }
// })

// 删除
// personModel.deleteMany()
// personModel.deleteOne()
// personModel.remove()

// personModel.remove({age:0},(err)=>{
//     if(!err){
//         console.log("删除成功")
//     }else{
//         throw err
//     }
// })

// 文档操作
// let article_index = new articleIndexModel({
//     name:"宋小宝",
//     age:40,
//     chat:"我是宋小宝"
// });

// article_index.save((err,product)=>{
//     if(!err){
//         console.log(product);
//     }
// })



// module.exports = articleIndexModel;
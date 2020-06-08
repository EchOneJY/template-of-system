const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias
} = require('customize-cra')
const path = require('path')
//打包后静态文件夹中会有很多的css和js的map文件，关闭sourcemap
// process.env.GENERATE_SOURCEMAP = 'false'
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#40a9ff' }
  }),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
    'components': path.resolve(__dirname, 'src/components')
  })
)

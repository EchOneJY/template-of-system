const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias
} = require('customize-cra')
const path = require('path')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      'brand-primary': 'red'
    }
  }),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
    components: path.resolve(__dirname, 'src/components')
  })
)

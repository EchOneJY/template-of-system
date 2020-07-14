const { addBeforeLoader, loaderByName } = require('@craco/craco')
const CracoLessPlugin = require('craco-less')
const path = require('path')

const myNewWebpackLoader = {
  loader: require.resolve('svg-sprite-loader')
}

const webpackConfig = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: path.resolve(__dirname, './src/pages/icons'), //只处理指定svg的文件(所有使用的svg文件放到该文件夹下)
        options: {
          symbolId: 'icon-[name]' //symbolId和use使用的名称对应      <use xlinkHref={"#icon-" + iconClass} />
        }
      }
    ]
  }
}

addBeforeLoader(webpackConfig, loaderByName('file-loader'), myNewWebpackLoader)

module.exports = {
  webpack: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1890ff' },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
}

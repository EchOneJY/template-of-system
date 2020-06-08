module.exports = {
  publicPath: './',
  devServer: {
    port: 8085,
    proxy: {
      '/api': {
        target: 'http://5000',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}

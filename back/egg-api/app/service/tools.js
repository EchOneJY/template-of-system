const Service = require('egg').Service
const svgCaptcha = require('svg-captcha')

class ToolsService extends Service {
  captcha() {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 36,
      noise: 2,
    })
    return captcha
  }
}

module.exports = ToolsService

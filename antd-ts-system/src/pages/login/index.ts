import React from 'react'
import { Form, Icon, Input, Button, Card, Spin, message } from 'antd'
import Particles from 'react-particles-js'
import config from './config/default'
import { reqLogin, getCaptcha } from '@/api'
import Memory from '@/utils/memory'
import Storage from '@/utils/storage'
/**
 * 登录的路由组件
 */

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />

const Login: React.FC = ({ form, history }) => {
  const [captcha, setCaptcha] = React.useState('')
  const [captchaLoading, setCaptchaLoading] = React.useState(false)

  React.useEffect(() => {
    //判断用户是否登
    const user = Memory.user
    if (Object.keys(user).length === 0) {
      getNewCaptcha()
    } else {
      history.push('/')
    }
  }, [history])

  const handleSubmit = e => {
    e.preventDefault()
    form.validateFields(async (err, values) => {
      if (!err) {
        const response = await reqLogin(values)
        if (response.data.code === 2 || response.data.code === 1) {
          Memory.user = response.data.data //保存在内存中
          Storage.set('USER_KEY', response.data.data) //保存到本地缓存
          history.push('/')
        } else {
          message.error(response.data.msg)
          form.setFieldsValue({ code: '' })
          getNewCaptcha()
        }
      }
    })
  }

  const getNewCaptcha = async () => {
    setCaptchaLoading(true)
    const response = await getCaptcha()
    if (response.status === 200) {
      setCaptcha(response.data)
      setCaptchaLoading(false)
    }
  }

  const validatePwd = (rule, value, callback) => {
    if (!value) {
      callback('密码不能为空')
    } else if (value.length < 4) {
      callback('密码长度不能小于4位')
    } else if (value.length > 12) {
      callback('密码长度不能大于12位')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('密码必须是英文、数字或下划线')
    } else {
      callback()
    }
  }

  const { getFieldDecorator } = form
  return (
    <div className="login-page">
      <Particles className="particle-canvas" params={config} />
      <div className="layer bg" id="login"></div>
      <div className="layer flex-center">
        {/* logo部分 */}
        <div className="logo-group">
          <img
            className="avatar"
            src={require('@/assets/imgs/logo.png')}
            alt="logo"
          />
        </div>
        {/* 表单部分 */}
        <div className="form-group">
          <Card style={{ width: 300 }} bordered={null}>
            <Form onSubmit={handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [
                    { required: true, message: '用户名不能为空' },
                    { min: 4, message: '用户名至少4位' },
                    { max: 12, message: '用户名最多12位' },
                    {
                      pattern: /^[a-zA-Z0-9_]+$/,
                      message: '用户名必须是英文数字或下划线'
                    }
                  ]
                })(
                  <Input
                    addonBefore={
                      <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder="Username"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      validator: validatePwd
                    }
                  ]
                })(
                  <Input
                    addonBefore={
                      <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    type="password"
                    placeholder="Password"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('code', {
                  rules: [{ required: true, message: '请输入验证码' }]
                })(
                  <Input
                    addonBefore="验证码"
                    placeholder="Captcha"
                    className="captcha-input"
                    maxLength={4}
                    addonAfter={
                      <Spin spinning={captchaLoading} indicator={antIcon}>
                        <div
                          className="captcha"
                          onClick={getNewCaptcha}
                          dangerouslySetInnerHTML={{
                            __html: captcha
                          }}
                        ></div>
                      </Spin>
                    }
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="button-login"
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
        {/* 帮助按钮 */}
        {/* <Button type="info" className="button-help" >
                        关于
                    </Button> */}
      </div>
    </div>
  )
}

const wrappedLogin = Form.create({ name: 'login' })(Login)

export default wrappedLogin

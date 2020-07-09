import React, { useState } from 'react'
import { Card, Form, Input, Button, notification } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import md5 from 'md5'

import { handleLogin } from '@/services'
import { setToken } from '@/utils/auth'

const Login = props => {
  console.log(props)
  const [formLogin] = Form.useForm()
  const [captcha, setCaptcha] = useState('/user/captcha')

  const onFinish = values => {
    const data = { ...values, password: md5(values.password), role: 'admin' }
    handleLogin(data)
      .then(res => {
        setToken(res.data.token)
        notification.success({
          message: '登陆成功',
          duration: 2
        })
        setTimeout(() => {
          let redirect = '/'
          if (props.location.search) {
            redirect = props.location.search.split('=')[1]
          }
          console.log(redirect)
          props.history.push(redirect || '/')
        }, 700)
      })
      .catch(error => {
        console.log(error)
        if (error.message === '验证码错误') {
          setTimeout(() => {
            formLogin.setFieldsValue({
              captcha: ''
            })
          }, 500)
        }
        if (error.message === '用户名密码错误') {
          setTimeout(() => {
            formLogin.setFieldsValue({
              password: '',
              captcha: ''
            })
          }, 500)
        }
        setCaptcha('user/captcha?_t=' + new Date().getTime())
      })
  }

  return (
    <div className="login-wrapper">
      <img className="login-logo" src={require('@/assets/logo.png')} alt="" />
      <div className="form-wrapper">
        <Card>
          <Form size="middle" form={formLogin} onFinish={onFinish}>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' }
              ]}
            >
              <Input className="login-input" addonBefore={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' }
              ]}
            >
              <Input.Password addonBefore={<LockOutlined />} />
            </Form.Item>
            <Form.Item
              name="captcha"
              rules={[{ required: true, message: 'Please input captcha!' }]}
            >
              <Input
                className="login-input captcha-input"
                addonBefore="验证码"
                addonAfter={
                  <img
                    className="captcha"
                    src={captcha}
                    onClick={() =>
                      setCaptcha('user/captcha?_t=' + new Date().getTime())
                    }
                    alt=""
                  />
                }
              />
            </Form.Item>
            <Form.Item>
              <Button className="login-btn" type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  )
}

export default Login

import React, { FC, useState } from 'react';
import { history } from 'umi';
import { Card, Form, Input, Button, notification, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import md5 from 'md5';

import './login.less';
import { LoginParamsType, fakeAccountLogin } from './service';
// import { setToken } from '@/utils/auth'

interface LoginProps {}

const Login: FC<LoginProps> = props => {
  console.log(props);
  const [formLogin] = Form.useForm();
  const [captcha, setCaptcha] = useState('/api/captcha');

  const onFinish = (values: any) => {
    const data = { ...values };
    fakeAccountLogin(data)
      .then(res => {
        if (res.status === 'ok') {
          notification.success({
            message: '登陆成功',
            duration: 2,
          });
          setTimeout(() => {
            // let redirect = '/'
            // if (props.location.search) {
            //   redirect = props.location.search.split('=')[1]
            // }
            // console.log(redirect)
            history.push('/');
          }, 700);
        } else {
          message.warning(res.message);
          if (res.message === '验证码错误') {
            setTimeout(() => {
              formLogin.setFieldsValue({
                captcha: '',
              });
              setCaptcha('/api/captcha?_t=' + new Date().getTime());
            }, 500);
          }
          if (res.message === '帐号密码错误') {
            setTimeout(() => {
              formLogin.setFieldsValue({
                password: '',
                captcha: '',
              });
              setCaptcha('/api/captcha?_t=' + new Date().getTime());
            }, 500);
          }
        }
      })
      .catch(error => {
        console.log(error);
        setCaptcha('/api/captcha?_t=' + new Date().getTime());
      });
  };

  return (
    <div className="login-wrapper">
      <img className="login-logo" src={require('@/assets/logo.png')} alt="" />
      <div className="form-wrapper">
        <Card>
          <Form size="middle" form={formLogin} onFinish={onFinish}>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input className="login-input" addonBefore={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
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
                      setCaptcha('/api/captcha?_t=' + new Date().getTime())
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
  );
};

export default Login;

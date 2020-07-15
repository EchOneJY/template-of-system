import { Request, Response } from 'express';
import svgCaptcha from 'svg-captcha';

let captchaText = '';

function generateCaptcha() {
  const captcha = svgCaptcha.create({
    size: 4,
    fontSize: 50,
    width: 100,
    height: 36,
    noise: 2,
  });
  return captcha;
}

function getCaptacha(req: Request, res: Response) {
  const captcha = generateCaptcha();
  captchaText = captcha.text;
  res.type('svg');
  return res.send(captcha.data);
}

function login(req: Request, res: Response) {
  const { username, password, captcha } = req.body;
  if (captcha.toUpperCase() !== captchaText.toUpperCase()) {
    res.send({
      status: 'error',
      message: '验证码输入有误',
    });
    return;
  }
  if (password === 'admin' && username === 'admin') {
    res.send({
      status: 'ok',
      currentAuthority: 'admin',
    });
    return;
  }
  if (password === 'user' && username === 'user') {
    res.send({
      status: 'ok',
      currentAuthority: 'user',
    });
    return;
  }

  res.send({
    status: 'error',
    currentAuthority: 'guest',
    message: '帐号密码输入有误',
  });
}

export default {
  'GET /api/captcha': getCaptacha,
  'POST /api/login': login,
};

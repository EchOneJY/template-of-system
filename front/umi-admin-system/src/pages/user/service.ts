import request from 'umi-request';

export interface LoginParamsType {
  username: string;
  password: string;
  captcha: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/login', {
    method: 'POST',
    data: params,
  });
}

import request from '@/utils/request'

export const handleLogin = data => {
  return request.post('/user/login', data)
}

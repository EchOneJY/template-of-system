import request from '@/utils/request'

export const queryAsyncRoutesName = role => {
  return request.get('/routes/' + role)
}

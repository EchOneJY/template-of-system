import request from '@/utils/request'

export const queryAsyncRoutesName = roles => {
  return request.get('/routes/match?roles=' + roles.join('-'))
}

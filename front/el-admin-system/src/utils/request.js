import axios from 'axios'
import store from '../store'
import { Message, MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      // config.headers['X-Token'] = getToken()
      config.headers.common['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const { data } = response
    if (data.code === 100) {
      return data
    }
    if (data.code === 401) {
      MessageBox.confirm('登陆已过期', '过期', {
        confirmButtonText: '登录',
        showCancelButton: false,
        type: 'warning',
        closeOnClickModal: false
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    }
    if (data.code === 999) {
      Message.error(data.message)
      return Promise.reject(new Error(data.message || 'Error'))
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service

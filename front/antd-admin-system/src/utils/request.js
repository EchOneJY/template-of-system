import axios from 'axios'
import { Modal, message } from 'antd'
import { getToken } from './auth'

const service = axios.create({
  timout: 5000
})

service.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
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
      Modal.warning({
        title: '登陆已过期',
        okText: '登录',
        onOk: close => {
          close()
        }
      })
    }
    if (data.code === 999) {
      message.error(data.message)
      return Promise.reject(data)
    }
  },
  error => {
    message.error(error)
    return Promise.reject(error)
  }
)

export default service

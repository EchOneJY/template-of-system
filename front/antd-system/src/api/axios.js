/**
 * 封装axios
 * 函数返回值是Promise对象
 *  */
import axios from 'axios';
import { message } from 'antd';
import {getToken} from '@/utils/auth'

const service = axios.create({
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    const token = getToken()
    if(token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const {data} = response
    if(data.code === 401) {
      message.error()
    }
  }
)

export default function fetchData(url,data={},method='GET') {
    return new Promise((resolve,reject) => {
        let promise
        if(method === 'GET') { 
            promise = axios.get(url,{
                params: data
            })
        }else {
            promise = axios.post(url,qs.stringify(data))
        }
        promise.then(response => {
            resolve(response)
        }).catch(error => {
            message.error('请求出错!'+error.message)
        })
    })

}

//请求登录接口

/**
 * 封装axios
 * 函数返回值是Promise对象
 *  */
import axios from 'axios';
import { message } from 'antd';
import qs from 'qs';

export default function fetchData(url,data={},method='POST') {
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

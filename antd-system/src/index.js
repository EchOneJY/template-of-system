import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

import App from './App'
import './assets/style/index.less'

import Memory from './utils/memory'
import Storage from './utils/storage'
//读取本地缓存中user，保存到内存中
const user = Storage.get('USER_KEY')
Memory.user = user ? user : {}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

## `redux-saga`:`redux`的另一个中间件，可以将异步请求或其他复杂的逻辑单独放入 saga.js 中处理

1、在没有使用`redux-saga`情况下，action 只能被 reducer 监听，且 reducer 只能返回不能修改 state

2、使用`redux-saga`之后, sagas.js 也可以接收 action,实现复杂逻辑函数包括异步请求并调用 store 的 action

## 1、创建 `store`

```
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import createSagaMiddleware from 'redux-saga'
import rootSagas from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSagas)

export default store
```

## 2、在 sagas.js 中定义复杂 `action`

```
import { takeEvery, put } from 'redux-saga/effects'
import { initListAction } from './actionCreators'
import { queryTodoList } from '@/api'

function* initList() {
  const response = yield queryTodoList(data)
  const data = response.data.data
  const action = {
    type: 'yyy',
    data: data
  }
  yield put(action)
}

function* rootSagas() {
  yield takeEvery({type: 'xxx'}, initList)
}

export default rootSagas
```

## 3、`Saga Helpers` 及 `Effects`

### `Saga Helpers`: 在一些特定的 action 被发起到 Store 时派生任务

```
import { takeEvery,takeLatest } from 'redux-saga/effects'
function* rootSagas() {
  yield takeEvery({type: 'xxx'}, initList)
  yield takeLatest({type: 'xxx'}, initList)
}

function* initList() {
  const response = yield queryTodoList(data)
  const data = response.data.data
  const action = {
    type: 'yyy',
    data: data
  }
  yield put(action)
}
```

1. `takeEvery`: 允许多个 fetchData 实例同时启动多个 initList
2. `takeLatest`: 只允许一个启动的 fetchData 任务执行，之前的这个任务会被自动取消

> 可以有多个 Saga 监视不同的 action:

```
import { takeEvery } from 'redux-saga/effects'

// FETCH_USERS
function* fetchUsers(action) { ... }

// CREATE_USER
function* createUser(action) { ... }

// 同时使用它们
export default function* rootSaga() {
  yield takeEvery('FETCH_USERS', fetchUsers)
  yield takeEvery('CREATE_USER', createUser)
}
```

### `Effects`: 发送给 middleware 的指令以执行某些操作

1.`call(fn,...args)`和`apply(fn,[...args])`: 函数调用，非常适合返回 Promise 结果的异步函数

2.`put`: 相当于 dispatch(action)

3.`take`: 主动监听 action，可实现控制流

```
takeEvery相当于
while (true) {
    const action = yield take('*')
}
```

4.`fork(fn,args)`: 函数无阻塞调用,执行 yield fork(fn,args)后，不等待回调函数结果直接执行下一行代码

5.`select`: 获取`store`上的 state 数据,同 store.getStatee()

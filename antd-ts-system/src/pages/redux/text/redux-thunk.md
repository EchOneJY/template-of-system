###`redux-thunk`作为`redux`的两大中间件之一，负责将异步请求或其他复杂的逻辑放到 `action` 去处理

1、在不引入中间件的情况下，调用 action 之前的所有复杂逻辑包括异步请求等都放在组件中处理，使组件显得过于臃肿，且不好管理

2、原则上 action 返回的是一个对象，使用 redux-thunk 中间件后,action 就可以返回一个函数,并可以直接 dispatch 其他 action

### 1、创建 `store`

```
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
import thunk from 'redux-thunk'

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store
```

### 2、在 actionCreators.js 中定义复杂 `action`

```
import { queryTodoList } from '@/api' //接口请求list列表

export const initListActionThunk = () => {
  return async dispatch => {
    const response = await queryTodoList(data)
    const data = response.data.data
    const action = {
      type: 'xxx',
      data: data
    }
    dispatch(action)
  }
}
```

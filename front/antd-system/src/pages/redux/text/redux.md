### 1、创建 `store`

```
  import { createStore } from 'redux'
  import reducer from './reducers'
  const store = createStore(reducer)
  export default store
```

### 2、订阅 `store`

```
  import store from '@/store'
  import { queryTodoList } from '@/api'//接口请求list列表

  constructor(props) {
    super(props)
    this.state = store.getState()
    store.subscribe(this.storeChange)
  }

  class Component extends React.Component {
    componentDidMount() {
      //异步请求示例
      queryTodoList(data).then(res => {
          const data = res.data.data
          const action = {
            type: 'xxx',
            data: data
          }
          store.dispatch(action)
      })
    }
    ...
  }
```

### 3、调用 `store`

```
  const action = {
    type: 'xxx',
    data
  }
  store.dispatch(action)
```

### 4、通过`reducer`处理数据 返回新的 `state`

`reducer`可以接收 state ,但是绝不能修改 state，所以 state 需要拷贝一份后进行修改，再将数据返回

```
  export default (state = {}, action) => {
    if (action.type === 'xxx') {
      let newState = JSON.parse(JSON.stringify(state))
      newState.key = action.data
      return newState
    }
  }
```

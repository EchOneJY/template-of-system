###`react-redux`是`redux`的第三方模块，其主要 API 包括：

1、`Provider`组件：其本质是一个提供器，`Provider`里的所有组件，都有获取 `store` 内容的能力。省去了在组件内订阅 `store` 的步骤

2、`connect`方法：接收`mapStateToProps`、`mapDispatchToProps`两个参数，将原组件转换为包含`store`里`state`、`action`的高阶组件

### 1、引入 `Provider`

```
import { Provider } from 'react-redux'

<Provider store={store}>
...
</Provider>
```

### 2、`connect` 连接 `store`

```
import { React } from 'react
import { connect } from 'react-redux'
import { queryTodoList } from '@/api' //接口请求list列表

class Component extends React.Component {
  ...
}

const mapStateToProps = state => {
  return {
    inputValue: state.todos.inputValue,
    list: state.todos.list
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleMethod() {
      const action = {
          type: 'xxx',
          data
      }
      dispatch(action)
    },
    //异步请求示例
    initList() {
      queryTodoList(data).then(res => {
        const data = res.data.data
        const action = {
          type: 'xxx',
          data: data
        }
        dispatch(action)
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
```

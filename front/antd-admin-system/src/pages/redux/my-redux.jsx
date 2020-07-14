import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Button, List, Card } from 'antd'
import {
  createStore,
  applyMiddleware,
  bindActionCreators
} from '@/store/createRedux'
import {
  setInputValue,
  setTodoList,
  ACTION_SET_INPUT_VALUE,
  ACTION_SET_TODO_LIST
} from '@/store/actions'
import { message } from 'antd'

const defaultState = {
  inputValue: '',
  list: ['早上4点起床，锻炼身体', '中午下班游泳一小时']
}
const todoListReducer = (state = defaultState, action) => {
  if (action.type === ACTION_SET_INPUT_VALUE) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.inputValue = action.payload
    return newState
  }
  if (action.type === ACTION_SET_TODO_LIST) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.list = action.payload
    return newState
  }
  return state
}

//自定义中间件
function logger({ dispatch, getState }) {
  return dispatch => action => {
    //执行中间件任务
    // console.log(action.type + '执行了！！')

    //执行下一个中间件
    return dispatch(action)
  }
}

//redux-thunk
function thunk({ dispatch, getState }) {
  return dispatch => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }
    return dispatch(action)
  }
}

//react-redux
function connect(mapStateToProps = state => state, mapDispatchToProps = {}) {
  return WrapComponent => {
    return class ConnectComponent extends React.Component {
      static contextTypes = {
        store: PropTypes.object
      }
      constructor(props, context) {
        super(props, context)
        this.state = {
          props: {}
        }
      }
      componentDidMount() {
        const { store } = this.context
        store.subscribe(() => this.update())
        this.update()
      }
      update() {
        const { store } = this.context
        const stateProps = mapStateToProps(store.getState())
        const dispatchProps = bindActionCreators(
          mapDispatchToProps,
          store.dispatch
        )
        this.setState({
          props: {
            ...this.state.props,
            ...stateProps,
            ...dispatchProps
          }
        })
      }
      render() {
        return <WrapComponent {...this.state.props}></WrapComponent>
      }
    }
  }
}

export class Provider extends React.Component {
  static childContextTypes = {
    store: PropTypes.object
  }
  getChildContext() {
    return { store: this.store }
  }
  constructor(props, context) {
    super(props, context)
    this.store = props.store
  }
  render() {
    return this.props.children
  }
}

const store = createStore(todoListReducer, applyMiddleware(logger, thunk))

export default class myRedux extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...store.getState()
    }
    store.subscribe(this.storeChange)
  }

  storeChange = () => {
    this.setState(store.getState())
  }

  changeInputVal = e => {
    const action = setInputValue(e.target.value)
    store.dispatch(action)
  }

  addEvents = () => {
    const inputValue = this.state.inputValue
    if (inputValue === '') {
      message.warning('内容不能为空')
      return
    }
    const list = this.state.list.concat(inputValue)
    store.dispatch(setTodoList(list))
    store.dispatch(setInputValue(''))
  }

  deleteItem = index => {
    const list = this.state.list.slice()
    list.splice(index, 1)
    store.dispatch(setTodoList(list))
  }

  render() {
    // console.log(store.getState())
    return (
      <Card title="My-Redux TodoList" className="todolist-box">
        <div>
          <Input
            className="input-box"
            value={store.getState().inputValue}
            placeholder="Write Something"
            onChange={this.changeInputVal}
          />
          <Button type="primary" onClick={this.addEvents}>
            增加
          </Button>
        </div>
        <div className="todolist-content">
          <List
            bordered
            //关键代码-----------start
            dataSource={store.getState().list}
            //关键代码-----------end
            renderItem={(item, index) => (
              <List.Item onClick={() => this.deleteItem(index)}>
                {item}
              </List.Item>
            )}
          />
        </div>
      </Card>
    )
  }
}

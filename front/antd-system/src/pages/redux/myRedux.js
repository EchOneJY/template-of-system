import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Button, List, Card } from 'antd'
import {
  createStore,
  applyMiddleware,
  bindActionCreators
} from '../../store/createRedux'
import { initListActionThunk } from '../../store/actionCreators'
import {
  CHANGE_INPUT,
  ADD_ITEM,
  DELETE_ITEM,
  INIT_LIST_ACTION
} from '../../store/actionTypes'
import { message } from 'antd'

const defaultState = {
  inputValue: '',
  list: ['早上4点起床，锻炼身体', '中午下班游泳一小时']
}
const todoListReducer = (state = defaultState, action) => {
  if (action.type === CHANGE_INPUT) {
    let newState = JSON.parse(JSON.stringify(state))
    newState.inputValue = action.value
    return newState
  }
  if (action.type === ADD_ITEM) {
    let newState = JSON.parse(JSON.stringify(state))
    if (newState.inputValue === '') {
      message.warning('内容不能为空')
      return newState
    }
    newState.list.push(newState.inputValue)
    newState.inputValue = ''
    return newState
  }
  if (action.type === DELETE_ITEM) {
    let newState = JSON.parse(JSON.stringify(state))
    newState.list.splice(action.index, 1)
    return newState
  }
  if (action.type === INIT_LIST_ACTION) {
    let newState = JSON.parse(JSON.stringify(state))
    newState.list = action.list
    return newState
  }
  return state
}

//自定义中间件
function logger({ dispatch, getState }) {
  return dispatch => action => {
    //执行中间件任务
    console.log(action.type + '执行了！！')

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
  }

  componentDidMount() {
    // store.dispatch(initListActionThunk())
    store.subscribe(() => this.forceUpdate())
  }

  changeInputVal = e => {
    const action = {
      type: CHANGE_INPUT,
      value: e.target.value
    }
    store.dispatch(action)
  }

  addEvents = () => {
    // store.dispatch({ type: ADD_ITEM })
    //thunk
    store.dispatch(
      setTimeout(() => {
        store.dispatch({ type: ADD_ITEM })
      }, 1000)
    )
  }

  deleteItem = idx => {
    const action = {
      type: DELETE_ITEM,
      index: idx
    }
    store.dispatch(action)
  }

  render() {
    // console.log(store.getState())
    return (
      <Card title="Redux TodoList" className="todolist-box">
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

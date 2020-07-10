import React from 'react'
import { Input, Button, List, Card, Divider, Row, Col, message } from 'antd'
import store from '@/store'
import { setInputValue, setTodoList } from '@/store/actions'

import markdownContent from './text/redux.md'

import Loadable from '@/utils/loadable'
const ReactMde = Loadable(() => import('@/pages/editor/components/Mde'))

class ReduxTest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      textValue: '',
      ...store.getState()
    }
    store.subscribe(this.storeChange)
  }

  storeChange = () => {
    this.setState(store.getState())
  }

  componentDidMount() {
    const defaultTodoList = ['Redux TodoList']
    store.dispatch(setTodoList(defaultTodoList))

    fetch(markdownContent)
      .then(res => res.text())
      .then(text => {
        this.setState({
          textValue: text
        })
      })
  }

  addTodoItem = () => {
    const inputValue = this.state.todos.inputValue
    if (inputValue === '') {
      message.warning('内容不能为空')
      return
    }
    const list = this.state.todos.todoList.concat(inputValue)
    store.dispatch(setTodoList(list))
    store.dispatch(setInputValue(''))
  }

  deleteTodoItem = index => {
    const list = this.state.todos.todoList.slice()
    list.splice(index, 1)
    store.dispatch(setTodoList(list))
  }

  changeInputVal = e => {
    const action = setInputValue(e.target.value)
    store.dispatch(action)
  }

  render() {
    return (
      <Row type="flex" style={{ height: '100%' }} gutter={40}>
        <Col span={10} className="todolist-box">
          <Card title="Redux TodoList">
            <div>
              <Input
                className="input-box"
                value={this.state.todos.inputValue}
                placeholder="Write Something"
                onChange={this.changeInputVal}
              />
              <Button type="primary" onClick={this.addTodoItem}>
                增加
              </Button>
            </div>
            <div className="todolist-content">
              <List
                bordered
                dataSource={this.state.todos.todoList}
                renderItem={(item, index) => (
                  <List.Item onClick={() => this.deleteTodoItem(index)}>
                    {item}
                  </List.Item>
                )}
              />
            </div>
          </Card>
        </Col>
        <Divider type="vertical" style={{ height: '100%' }} />
        <Col span={13}>
          <ReactMde
            value={this.state.textValue}
            selectedTab="preview"
            readOnly
          />
        </Col>
      </Row>
    )
  }
}

export default ReduxTest

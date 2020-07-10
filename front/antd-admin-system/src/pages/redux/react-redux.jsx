import React, { useState, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Input, Button, List, Card, Divider, Row, Col, message } from 'antd'
import { setInputValue, setTodoList } from '@/store/actions'

import markdownContent from './text/react-redux.md'
import Loadable from '@/utils/loadable'
const ReactMde = Loadable(() => import('@/pages/editor/components/Mde'))

const ReactReduxTest = props => {
  const { inputValue, todoList, changeInputVal, setTodos } = props
  const [textValue, setTextValue] = useState(inputValue)

  useEffect(() => {
    const defaultTodoList = ['React-Redux TodoList']
    setTodos(defaultTodoList)
  }, [])

  useEffect(() => {
    fetch(markdownContent)
      .then(res => res.text())
      .then(text => {
        setTextValue(text)
      })
  }, [])

  const addTodos = () => {
    if (inputValue === '') {
      message.warning('内容不能为空')
      return
    }
    const list = todoList.concat(inputValue)
    setTodos(list)
    changeInputVal('')
  }

  const deleteTodos = index => {
    const list = todoList.slice()
    list.splice(index, 1)
    setTodos(list)
  }

  return (
    <Row type="flex" style={{ height: '100%' }} gutter={40}>
      <Col span={10} className="todolist-box">
        <Card title="React-Redux TodoList">
          <div>
            <Input
              className="input-box"
              value={inputValue}
              placeholder="Write Something"
              onChange={e => changeInputVal(e.target.value)}
            />
            <Button type="primary" onClick={addTodos}>
              增加
            </Button>
          </div>
          <div className="todolist-content">
            <List
              bordered
              dataSource={todoList}
              renderItem={(item, index) => (
                <List.Item onClick={() => deleteTodos(index)}>{item}</List.Item>
              )}
            />
          </div>
        </Card>
      </Col>
      <Divider type="vertical" style={{ height: '100%' }} />
      <Col span={13}>
        <ReactMde value={textValue} selectedTab="preview" readOnly />
      </Col>
    </Row>
  )
}

const mapStateToProps = ({ todos }) => {
  return {
    inputValue: todos.inputValue,
    todoList: todos.todoList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeInputVal: bindActionCreators(setInputValue, dispatch),
    setTodos: bindActionCreators(setTodoList, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactReduxTest)

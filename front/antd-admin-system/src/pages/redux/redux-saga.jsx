import React, { useState, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Input, Button, List, Card, Row, Col } from 'antd'
import {
  setInputValue,
  setTodoList,
  addTodoItemSaga,
  deleteTodoItemSaga
} from '@/store/actions'

import markdownContent from './text/redux-saga.md'
import Loadable from '@/utils/loadable'
const ReactMde = Loadable(() => import('@/pages/editor/components/Mde'))

const ReactReduxTest = props => {
  const {
    inputValue,
    todoList,
    changeInputVal,
    setTodos,
    addTodos,
    deleteTodos
  } = props
  const [textValue, setTextValue] = useState(inputValue)

  useEffect(() => {
    const defaultTodoList = ['Redux-Saga TodoList']
    setTodos(defaultTodoList)
  }, [])

  useEffect(() => {
    fetch(markdownContent)
      .then(res => res.text())
      .then(text => {
        setTextValue(text)
      })
  }, [])

  return (
    <Row type="flex" gutter={40}>
      <Col span={10} className="todolist-box">
        <Card title="Redux-Saga TodoList">
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
      <Col span={14}>
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
    setTodos: bindActionCreators(setTodoList, dispatch),
    addTodos: bindActionCreators(addTodoItemSaga, dispatch),
    deleteTodos: bindActionCreators(deleteTodoItemSaga, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactReduxTest)

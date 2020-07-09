import React from 'react'
import { Input, Button, List, Card, message } from 'antd'
import store from '@/store'
import { changeTodoInput, addTodoItem, deleteTodoItem } from '@/store/actions'

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

  changeInputVal = e => {
    const action = changeTodoInput(e.target.value)
    store.dispatch(action)
  }

  addItem = () => {
    const addAction = addTodoItem(this.state.todos.inputValue)
    store.dispatch(addAction)

    const clearAction = changeTodoInput('')
    store.dispatch(clearAction)
  }

  deleteItem = idx => {
    const action = deleteTodoItem(idx)
    store.dispatch(action)
  }

  render() {
    return (
      <Card title="Redux TodoList">
        <div>
          <Input
            className="input-box"
            value={this.state.todos.inputValue}
            placeholder="Write Something"
            onChange={this.changeInputVal}
          />
          <Button type="primary" onClick={this.addItem}>
            增加
          </Button>
        </div>
        <div className="todolist-content">
          <List
            bordered
            //关键代码-----------start
            dataSource={this.state.todos.todoList}
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

export default ReduxTest

import React from 'react'
import { Input, Button, List } from 'antd'
import store from '@/store'
import { queryTodoList } from '@/api'
import {
  changeInputAction,
  addItemAction,
  deleteItemAction,
  initListAction
} from '@/store/actionCreators'

class ReduxTest extends React.Component {
  constructor(props) {
    super(props)
    this.state = store.getState()
    store.subscribe(this.storeChange)
  }

  componentDidMount() {
    queryTodoList().then(res => {
      if(res.data.code === 1) {
        const data = res.data.data
        const action = initListAction(data)
        console.log(action)
        store.dispatch(action)
      }
    })
  }

  storeChange = () => {
      this.setState(store.getState())
  }

  changeInputVal = (e) => {
      const action = changeInputAction(e.target.value)
      store.dispatch(action)
  }

  addEvents = () => {
      const action = addItemAction
      store.dispatch(action)
  }

  deleteItem = (idx) => {
      const action = deleteItemAction(idx)
      store.dispatch(action)
  }

  render() {    
    return (
      <div>
        <div>
          <Input
            value={this.state.inputValue}
            placeholder="Write Something"
            style={{ width: '250px', marginRight: '10px' }}
            onChange={this.changeInputVal}
          />
          <Button type="primary" onClick={this.addEvents}>
            增加
          </Button>
        </div>
        <div style={{ marginTop: '20px', width: '300px' }}>
          <List
            bordered
            //关键代码-----------start
            dataSource={this.state.list}
            //关键代码-----------end
            renderItem={(item, index) => (
              <List.Item onClick={() => this.deleteItem(index)}>
                {item}
              </List.Item>
            )}
          />
        </div>
      </div>
    )
  }

}


export default ReduxTest

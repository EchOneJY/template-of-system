import React from 'react'
import { Input, Button, List } from 'antd'
import { connect } from 'react-redux'
// import store from '@/store'
// import { queryTodoList } from '@/api'
import {
  changeInputAction,
  addItemAction,
  deleteItemAction,
  initListAction,
  initListAsync
} from '@/store/actionCreators'

class ReduxTest extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = store.getState()
  //   store.subscribe(this.storeChange)
  // }

  // storeChange = () => {
  //     this.setState(store.getState())
  // }
  componentDidMount() {
    this.props.initList()
  }

  // changeInputVal = (e) => {
  //     const action = changeInputAction(e.target.value)
  //     store.dispatch(action)
  // }

  // addEvents = () => {
  //     const action = addItemAction
  //     store.dispatch(action)
  // }

  // deleteItem = (idx) => {
  //     const action = deleteItemAction(idx)
  //     store.dispatch(action)
  // }

  // const { inputValue, changeInputVal, addEvents, list, deleteItem } = props
  render() {
    
    return (
      <div>
        <div>
          <Input
            value={this.props.inputValue}
            placeholder="Write Something"
            style={{ width: '250px', marginRight: '10px' }}
            onChange={this.props.changeInputVal}
          />
          <Button type="primary" onClick={this.props.addEvents}>
            增加
          </Button>
        </div>
        <div style={{ marginTop: '20px', width: '300px' }}>
          <List
            bordered
            //关键代码-----------start
            dataSource={this.props.list}
            //关键代码-----------end
            renderItem={(item, index) => (
              <List.Item onClick={() => this.props.deleteItem(index)}>
                {item}
              </List.Item>
            )}
          />
        </div>
      </div>
    )
  }

}

const stateToProps = state => {
  return {
    inputValue: state.todos.inputValue,
    list: state.todos.list
  }
}

const dispatchToProps = dispatch => {
  return {
    changeInputVal(e) {
      const action = changeInputAction(e.target.value)
      dispatch(action)
    },
    addEvents() {
      const action = addItemAction()
      dispatch(action)
    },
    deleteItem(idx) {
      const action = deleteItemAction(idx)
      dispatch(action)
    },
    // //redux-thunk
    // initList() {
    //     const action = initListAsync()
    //     dispatch(action)
    // },
     //redux-saga
     initList() {
      const action = initListAction()
      dispatch(action)
    }
    // initList() {
    //   queryTodoList().then(res => {
    //     const data = res.data.data
    //     const action = initListAction(data)
    //     dispatch(action)
    //   })
    // }
  }
}

export default connect(
  stateToProps,
  dispatchToProps
)(ReduxTest)

import React from 'react'
import { Input, Button, List, Row, Col, Card, Divider } from 'antd'
import store from '@/store'
import { queryTodoList } from '@/api'
import {
  changeInputAction,
  addItemAction,
  deleteItemAction,
  initListAction
} from '@/store/actionCreators'

import ReactMde from 'react-mde'
import * as Showdown from 'showdown'
import 'react-mde/lib/styles/css/react-mde-all.css'
import markdownContent from './text/redux.md'

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
})

class ReduxTest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      textValue: '',
      selectedTab: 'write',
      ...store.getState()
    }
    store.subscribe(this.storeChange)
  }

  componentWillMount() {
    fetch(markdownContent)
      .then(res => res.text())
      .then(text => {
        console.log(text)
        this.setState({
          textValue: text,
          selectedTab: 'preview'
        })
      })
  }

  componentDidMount() {
    const data = {
      type: '00'
    }
    queryTodoList(data).then(res => {
      if (res.data.code === 1) {
        const data = res.data.data
        const action = initListAction(data)
        store.dispatch(action)
      }
    })
  }

  storeChange = () => {
    this.setState(store.getState())
  }

  changeInputVal = e => {
    const action = changeInputAction(e.target.value)
    store.dispatch(action)
  }

  addEvents = () => {
    const action = addItemAction()
    store.dispatch(action)
  }

  deleteItem = idx => {
    const action = deleteItemAction(idx)
    store.dispatch(action)
  }

  setTextValue = val => {
    this.setState({
      textValue: val
    })
  }

  setSelectedTab = e => {
    if (this.state.selectedTab === 'preview') {
      this.setState({
        selectedTab: 'write'
      })
    } else {
      this.setState({
        selectedTab: 'preview'
      })
    }
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
              <Button type="primary" onClick={this.addEvents}>
                增加
              </Button>
            </div>
            <div className="todolist-content">
              <List
                bordered
                //关键代码-----------start
                dataSource={this.state.todos.list}
                //关键代码-----------end
                renderItem={(item, index) => (
                  <List.Item onClick={() => this.deleteItem(index)}>
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
            className="mde"
            minEditorHeight={350}
            minPreviewHeight={350}
            selectedTab={this.state.selectedTab}
            onChange={val => this.setTextValue(val)}
            onTabChange={e => this.setSelectedTab(e)}
            value={this.state.textValue}
            generateMarkdownPreview={markdown =>
              Promise.resolve(converter.makeHtml(markdown))
            }
            readOnly={true}
          />
        </Col>
      </Row>
    )
  }
}

export default ReduxTest

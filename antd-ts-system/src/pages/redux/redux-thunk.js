import React from 'react'
import { Input, Button, List, Row, Col, Card, Divider } from 'antd'
import { connect } from 'react-redux'
import {
  changeInputAction,
  addItemAction,
  deleteItemAction,
  initListActionThunk
} from '@/store/actionCreators'

import ReactMde from 'react-mde'
import * as Showdown from 'showdown'
import 'react-mde/lib/styles/css/react-mde-all.css'
import markdownContent from './text/redux-thunk.md'

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
      selectedTab: 'write'
    }
  }

  componentDidMount() {
    fetch(markdownContent)
      .then(res => res.text())
      .then(text => {
        this.setState({
          textValue: text,
          selectedTab: 'preview'
        })
      })
    this.props.initList()
  }

  setTextValue = val => {
    this.setState({
      textValue: val
    })
  }

  setSelectedTab = e => {
    this.setState({
      selectedTab: e
    })
  }

  render() {
    return (
      <Row type="flex" style={{ height: '100%' }} gutter={40}>
        <Col span={10} className="todolist-box">
          <Card title="Redux-Thunk TodoList">
            <div>
              <Input
                className="input-box"
                value={this.props.inputValue}
                placeholder="Write Something"
                onChange={this.props.changeInputVal}
              />
              <Button type="primary" onClick={this.props.addEvents}>
                增加
              </Button>
            </div>
            <div className="todolist-content">
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
    //redux-thunk
    initList() {
      const action = initListActionThunk()
      dispatch(action)
    }
  }
}

export default connect(stateToProps, dispatchToProps)(ReduxTest)

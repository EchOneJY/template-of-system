import * as React from 'react'
import { Form, Input, Button, Switch, Select, message } from 'antd'
import { queryCategory, addArticle, getTagsList } from '../../api'
import ReactMde from 'react-mde'
import * as Showdown from 'showdown'
import 'react-mde/lib/styles/css/react-mde-all.css'

const { Option } = Select

const ArticleAdd = ({ form, history }) => {
  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  })

  // const [value, setValue] = React.useState("**Hello world!!!**");
  const [selectedTab, setSelectedTab] = React.useState('write')
  const [categoryList, setCategoryList] = React.useState([])
  const [tagsList, setTagsList] = React.useState([])

  React.useEffect(() => {
    queryCategoryList()
    queryTagsList()
  }, [])

  const setValue = val => {
    form.setFieldsValue({
      content: val
    })
  }

  const queryCategoryList = async () => {
    const response = await queryCategory()
    if (response.data.code === 1) {
      setCategoryList(response.data.data)
    }
  }

  const queryTagsList = async () => {
    const response = await getTagsList()
    if (response.data.code === 1) {
      setTagsList(response.data.data)
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    form.validateFields(async (error, values) => {
      if (!error) {
        const submitData = {
          title: values.title,
          content: values.content, // or values.content.toHTML()
          top: values.top ? '00' : '01',
          private: values.visible,
          categories: values.category,
          tags: values.tags.join(' ')
        }
        console.log(submitData)
        const response = await addArticle(submitData)
        if (response.data.code === 1) {
          message.success('添加成功')
          setTimeout(() => {
            history.push('/article/list')
          }, 1000)
        }
      }
    })
  }

  const formItemLayout = {
    labelCol: {
      span: 2
    },
    wrapperCol: {
      span: 21
    }
  }
  const { getFieldDecorator } = form

  return (
    <div className="article-add">
      <Form onSubmit={handleSubmit}>
        <Form.Item {...formItemLayout} label="标题">
          {getFieldDecorator('title', {
            validateTrigger: 'onBlur',
            rules: [
              {
                required: true,
                message: '请输入标题'
              }
            ]
          })(<Input className="input-title" placeholder="请输入标题" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="正文">
          {getFieldDecorator('content', {
            initialValue: '**Hello world!!!**',
            validateTrigger: 'onBlur',
            rules: [
              {
                required: true,
                message: '请输入正文内容'
              }
            ]
          })(
            <ReactMde
              className="mde"
              minEditorHeight={350}
              minPreviewHeight={350}
              onChange={setValue}
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
              generateMarkdownPreview={markdown =>
                Promise.resolve(converter.makeHtml(markdown))
              }
            />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="置顶">
          {getFieldDecorator('top', {
            valuePropName: 'checked',
            initialValue: false
          })(<Switch />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="可见">
          {getFieldDecorator('visible', {
            valuePropName: 'checked',
            initialValue: true
          })(<Switch />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="分类">
          {getFieldDecorator('category', { initialValue: '' })(
            <Select className="input-select" placeholder="请选择分类">
              {categoryList.map(item => (
                <Option key={item._id} value={item.name}>
                  {item.name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="标签">
          {getFieldDecorator('tags', { initialValue: [] })(
            <Select
              className="input-select"
              mode="multiple"
              placeholder="请选择标签"
            >
              {tagsList.map(item => (
                <Option key={item._id} value={item.name}>
                  {item.name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 2 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

const WrappedArticleAdd = Form.create()(ArticleAdd)
export default WrappedArticleAdd

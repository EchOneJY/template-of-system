import * as React from 'react'
import BreadcrumbCustom from '../../components/BreadcrumbCustom'
import { Table, Pagination, Tag, Button, Switch, Modal, message } from 'antd'
import {
  queryArticleList,
  deleteArticle,
  changeTop,
  changePrivate
} from '../../api'

const { confirm } = Modal

const ArticleList = ({ ...props }) => {
  const [dataSource, setDataSource] = React.useState([])
  const [deleteState, setDeleteState] = React.useState(true)
  const [selectedRows, setSelectedRows] = React.useState([])

  React.useEffect(() => {
    queryArticle()
  }, [])

  const columns = [
    {
      title: '文章标题',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: '标签',
      key: 'tags',
      dataIndex: 'tags',
      align: 'center',
      render: tags => (
        <span>
          {tags.split(' ').map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green'
            if (tag === 'loser') {
              color = 'volcano'
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            )
          })}
        </span>
      )
    },
    {
      title: '分类',
      dataIndex: 'categories',
      key: 'categories',
      align: 'center'
    },
    {
      title: '可见',
      dataIndex: 'private',
      align: 'center',
      render: (visible, record, index) => (
        <Switch
          key={visible}
          defaultChecked={visible}
          onChange={() => onSwitchChange(!visible, record, 'visible')}
        />
      )
    },
    {
      title: '置顶',
      dataIndex: 'top',
      align: 'center',
      render: (top, record, index) => {
        return (
          <Switch
            key={top}
            defaultChecked={top === '00' ? true : false}
            onChange={() =>
              onSwitchChange(top === '00' ? '01' : '00', record, 'top')
            }
          />
        )
      }
    },
    {
      title: '创建时间',
      dataIndex: 'datetime',
      key: 'datetime',
      align: 'center'
    },
    {
      title: '编辑',
      key: 'action',
      align: 'center',
      render: (text, record) => (
        <span>
          <span
            className="link-button"
            onClick={() => props.history.push('/article/detail/' + record.id)}
          >
            编辑
          </span>
        </span>
      )
    }
  ]

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      if (selectedRows.length > 0) {
        setDeleteState(false)
      } else {
        setDeleteState(true)
      }
      setSelectedRows(selectedRows)
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name
    })
  }

  const queryArticle = async () => {
    const data = {
      pageSize: '10',
      currentPage: '1'
    }
    const response = await queryArticleList(data)
    if (response.data.code === 1) {
      let dataSource = response.data.data
      dataSource.map(item => {
        item.key = item._id
        item.visible = item.private
      })
      setDataSource(dataSource)
    }
  }

  const onSwitchChange = async (state, record, type) => {
    let data = {
      id: record._id
    }
    if (type === 'top') {
      data.isTop = state
      const response = await changeTop(data)
      if (response.data.code === 1) {
        queryArticle()
      }
    }
    if (type === 'visible') {
      data.isPrivate = state
      const response = await changePrivate(data)
      if (response.data.code === 1) {
        queryArticle()
      }
    }
  }

  const handleDelete = rows => {
    confirm({
      title: '确认删除?',
      onOk: async () => {
        let idList = []
        rows.map(item => {
          idList.push(item._id)
        })
        const response = await deleteArticle({ id: idList.join(',') })
        if (response.data.code === 1) {
          message.success('删除成功')
          queryArticle()
        }
      },
      okText: '确认',
      cancelText: '取消'
    })
  }

  return (
    <div className="article-list">
      <BreadcrumbCustom first="博客" second="文章列表" />
      <Table
        pagination={false}
        columns={columns}
        dataSource={dataSource}
        rowSelection={rowSelection}
        locale={{ emptyText: '暂无数据' }}
        size="middle"
        bordered
      />
      <div className="footer-box">
        <Button
          icon="delete"
          onClick={() => handleDelete(selectedRows)}
          disabled={deleteState}
          className="delete-btn"
        >
          删除
        </Button>
        <Pagination className="pagination" defaultCurrent={1} total={10} />
      </div>
    </div>
  )
}

export default ArticleList

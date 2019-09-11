import React, { Component } from 'react';
import { Button, Icon, Table, Divider, Modal, Form, Input, Switch, message } from 'antd';
import { 
    addCategory, 
    queryCategory, 
    deleteCategory, 
    updateCategory,
    getTagsList,
    updateTag,
    addTags,
    deleteTags
} from '../api';

const { confirm } = Modal;

class CategoryAndTags extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            visible: false,
            dataSource: []
        }
    }

    componentWillMount() {
        if(this.props.showType === '0') {
            this.showTypeName = '分类'
        }else if(this.props.showType === '1') {
            this.showTypeName = '标签'
        }
    }

    componentDidMount() {
        this.getList()
    }

    async getList() {
        const response = this.props.showType === '0'?await queryCategory():await getTagsList()
        if(response.data.code === 1) {
            this.setState({
                dataSource: response.data.data
            })
        }
    }

    //弹出框 1打开 0关闭
    toggleModel = (e) => {
        this.setState({
            visible: e === 0?false:true
        })
    }

    handleOk = () => {
        const repeatState = this.state.dataSource.find(item => item.name === this.props.form.getFieldValue('name'))
        if(repeatState) {
            message.warning(`该${this.showTypeName}已存在`)
            return
        }else {
            this.props.form.validateFields(async(err, values) => {
                if (!err) {
                    if(this.updateState) {
                        values.id = this.currentId
                        values.top = values.top?'00':'01'
                        const response = this.props.showType === '0'?await updateCategory(values):await updateTag(values)
                        if(response.data.code === 1) {
                            this.getList()
                            this.toggleModel(0)
                            this.props.form.resetFields()
                            message.success(`修改${this.showTypeName}成功`)
                        }
                    }else {
                        values.top = values.top?'00':'01'
                        const response = this.props.showType === '0'?await addCategory(values):await addTags(values)
                        if(response.data.code === 1) {
                            this.getList()
                            this.toggleModel(0)
                            this.props.form.resetFields()
                            message.success(`添加${this.showTypeName}成功`)
                        }
                    }
                }
            });
        }
    }

    addItem = () => {
        this.props.form.resetFields()
        this.updateState = false
        this.toggleModel(1)
    }

    deleteItem = (e) => {
        confirm({
            title: '确认删除？',
            okText: '确认',
            cancelText: '取消',
            onOk: async() => {
                const response = this.props.showType === '0'?await deleteCategory({id:e._id}):await deleteTags({id:e._id})
                if(response.data.code === 1) {
                    message.success('删除成功')
                    this.getList()
                }
            }
        });
    }

    updateItem = (e) => {
        this.updateState = true
        this.currentId = e._id
        this.toggleModel(1)
        this.props.form.setFieldsValue({
            name: e.name,
            top: e.top === '01'?false:true
        })
    }

    render() { 
        const dataSource = this.state.dataSource;
        const columns = [
            {
              title: `${this.showTypeName}名称`,
              dataIndex: 'name',
              width: 400
            },
            {
              title: '编辑',
              key: 'action',
              align: 'center',
              render: (text, record) => (
                <span>
                  <span className="link-button" onClick={() => this.updateItem(record)}>编辑</span>
                  <Divider type="vertical" />
                  <span className="link-button" onClick={() => this.deleteItem(record)}>删除</span>
                </span>
              )
            },
        ];
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
               span: 16
            }
        };
        return ( 
            <div className="category-list">
                <p className="head">
                    <Button onClick={this.addItem}>
                        <Icon type="plus"/>
                        添加
                    </Button>
                </p>
                <Table columns={columns} dataSource={dataSource} rowKey={(record,index) => record._id} locale={{emptyText: '暂无数据' }} size="middle" bordered/>
                <Modal
                title={this.updateState?`修改${this.showTypeName}`:`添加${this.showTypeName}`}
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={() => this.toggleModel(0)}
                cancelText="取消"
                okText="确认"
                >
                    <Form {...formItemLayout}>
                        <Form.Item label={this.showTypeName+'名'}>
                            {
                               getFieldDecorator('name', {
                                rules: [{required: true, message: `请输入${ this.showTypeName }名` }]
                               })(<Input/>) 
                            }
                        </Form.Item>
                        <Form.Item label="置顶">
                            {
                               getFieldDecorator('top',{ valuePropName: 'checked' })(<Switch/>) 
                            }
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
         );
    }
}
 
const WrappedCategoryAndTags = Form.create()(CategoryAndTags)
export default WrappedCategoryAndTags;
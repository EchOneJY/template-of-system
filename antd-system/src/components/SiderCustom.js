import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {  Menu, Icon } from 'antd'
import { menuAside } from '../config/menuList'

const { SubMenu } = Menu

class SiderCustom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 1
        }
    }

    componentWillMount() {
        this.showSiderMenuList(this.props.headerType)
        this.num = 0
    }

    componentDidMount(){
        this.getTitle(menuAside)
    }

    componentDidUpdate() {
        this.getTitle(menuAside)
    }

    componentWillReceiveProps(nextProps) {
        this.showSiderMenuList(nextProps.headerType)
    }

    showSiderMenuList(type) {
        const list = menuAside.find(item => item.type === type)
        if(list) {
            if(list.hasOwnProperty('children')){
                this.hasMenuAside = true
                this.menuNodes = this.getMenuNodes(list.children)
            }else {
                this.hasMenuAside = false
            }
        }else {
            this.hasMenuAside = false
        }
    }
 
    getTitle = (list) => {
        const path = this.props.location.pathname
        list.map(item => {
            if(!item.children) {
                document.title = item.title
            }else {
                 //匹配当前子列表路径
                 const cItem = item.children.find(cItem => cItem.key === path)
                 if(cItem) {
                     document.title = item.title+'-'+cItem.title
                 }
            }
        })
    }
  
    //根据数组数据生成标签数据
    getMenuNodes = (list) => {
        return list.map(item => {
            if(!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            {
                                item.icon?<Icon type={item.icon}/>:null
                            }
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }else {
                return (
                    <SubMenu
                    key={item.key}
                    title={
                        <span>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                        </span>
                    }
                    >
                        {
                          this.getMenuNodes(item.children)  
                        }
                    </SubMenu>
                )
            }
        })
    }

    render() { 
        //得到当前路径
        const path = this.props.location.pathname
        let menuNode
  
        if(this.hasMenuAside) {
            menuNode = (
                <Menu  mode="inline" selectedKeys={[path]}>
                    {
                        this.menuNodes
                    }
                </Menu>
            )
        }else {
            if(this.props.collapsed) {
                menuNode = null
            }else {
                menuNode = (
                    <div className="none-menu">
                        <Icon type="rest" theme="filled" />
                        <span>没有侧栏菜单</span>
                    </div>
                )
            }
        }
      
        return ( 
            <div className="sider-custom">
                <div className="logo" />
                {menuNode}
            </div> 
         );
    }
}
 
const mapStateToProps = state => (
    {
        headerType: state.headerType
    }
)

const RouterSiderCustom = withRouter(SiderCustom)
export default connect(mapStateToProps)(RouterSiderCustom);
import React, { useState, useEffect } from 'react'
import { Menu, Icon, Avatar, Dropdown, Modal } from 'antd';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
// import Memory from '../utils/memory';
import Storage from '../utils/storage';
import { menuHeader } from '../config/menu/menuList'
import { toogleHeaderType } from '../store/actionCreators'

const { SubMenu } = Menu;
const { confirm } = Modal;
const storage = new Storage()

interface MenuType {
  key: string
  title: string
  icon: string
  type: string
}

const HeaderCustom = function ({...props}) { 
    const [username,setUserName] = useState('')

    // useEffect(() => {
    //     const user = Memory.user
    //     if(!user || !user.uuid) {
    //         props.history.push('/login')
    //     }else {
    //         setUserName(user.username)
    //     }
    // })

    const goToPage = (item:MenuType) => {
        props.history.push(item.key)
        if(props.headerType !== item.type) {
            props.toogleHeaderType(item.type)
        }
    }

    const quit = () => {
        confirm({
            title: '确认退出？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                storage.remove('USER_KEY')
                // Memory.user = {}
                props.history.push('/login')
            }
        });
    }

    //根据数组数据生成标签数据
    const getMenuNodes = (list) => {
        const path = props.location.pathname
        return list.map(item => {
            if(!item.children) {
                //匹配当前无子列表路径
                if(item.key === path) {
                    if(props.headerType !== item.type) {
                        props.toogleHeaderType(item.type)
                    }
                }
                return (
                    <Menu.Item key={item.key} onClick={() => goToPage(item)}>
                        {
                            item.icon?<Icon type={item.icon}/>:null
                        }
                        <span>{item.title}</span>
                    </Menu.Item>
                )
            }else {
                //匹配当前子列表路径
                const cItem = item.children.find(cItem => cItem.key === path)
                if(cItem) {
                    if(props.headerType !== item.type) {
                        props.toogleHeaderType(cItem.type)
                    }
                }
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
                            getMenuNodes(item.children)  
                        }
                    </SubMenu>
                )
            }
        })
    }

    const menu = (
        <Menu>
          <Menu.Item onClick={quit}>
              <Icon type="logout" />
              <span>注销</span>  
          </Menu.Item>
        </Menu>
    )

    return ( 
        <div className="header-custom">
            <Menu selectedKeys={[props.location.pathname]}  mode="horizontal">
                {
                    getMenuNodes(menuHeader)
                }
            </Menu>
            <div className="operation">
                <span className="username">{username}</span>
                <Dropdown overlay={menu} placement="bottomCenter" overlayClassName="user-dropdown">
                    <Avatar src={require('../assets/imgs/logo.png')} />
                </Dropdown>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => (
    {
        headerType: state.headerType
    }
)

const mapDispatchToProps = dispatch => (
    {
        toogleHeaderType: type => {
            const action = toogleHeaderType(type)
            dispatch(action)
        }
    }
)
 
const RouterHeaderCustom = withRouter(HeaderCustom)
export default connect(mapStateToProps,mapDispatchToProps)(RouterHeaderCustom);
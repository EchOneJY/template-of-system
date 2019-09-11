import React, { Component } from 'react';
import { Layout, Icon } from 'antd';
import Routes from '../../routes';
import Memory from '../../utils/memory';
import SiderCustom from '../../components/SiderCustom'
import HeaderCustom from '../../components/HeaderCustom'
import { Provider } from 'react-redux'
import store from '../../store'

const { Header, Sider, Content  } = Layout;

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            collapsed: false,
         }
    };

    componentDidMount() {
        const user = Memory.user
        if(Object.keys(user).length === 0) {
            this.props.history.push('/login')
        }else {
            // message.success('Hello,'+user.username)
        }
    }

    toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
    };
      
    render() { 
        return ( 
            <Provider store={store}>
                <Layout className="ant-layout">
                    <Sider trigger={null} theme="light" collapsible collapsed={this.state.collapsed}>
                        <SiderCustom collapsed={this.state.collapsed}/>
                    </Sider>
                    <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                        className="trigger"
                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.toggle}
                        />
                        <HeaderCustom />
                    </Header>
                    <Content
                        style={{
                        margin: '24px 16px',
                        padding: 24,
                        background: '#fff',
                        minHeight: 280,
                        }}
                    >
                        <Routes/>
                    </Content>
                    </Layout>
                </Layout>
           </Provider>
         );
    }
}
 
export default Admin;
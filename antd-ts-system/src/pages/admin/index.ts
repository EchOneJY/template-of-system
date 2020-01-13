import React from 'react'
import { Layout, Icon, message } from 'antd'
import Routes from '@/routes'
import Memory from '@/utils/memory'
import SiderCustom from '@/components/SiderCustom'
import HeaderCustom from '@/components/HeaderCustom'
import { Provider } from 'react-redux'
import store from '@/store'

const { Header, Sider, Content } = Layout

const Admin: React.FC = ({ history }) => {
  const [collapsed, setCollapsed] = React.useState(false)

  React.useEffect(() => {
    const user = Memory.user
    if (Object.keys(user).length === 0) {
      history.push('/login')
    } else {
      // message.success('Hello,' + user.username)
    }
  })

  return (
    <Provider store={store}>
      <Layout className="ant-layout">
        <Sider trigger={null} theme="light" collapsible collapsed={collapsed}>
          <SiderCustom collapsed={collapsed} />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={() => setCollapsed(!collapsed)}
            />
            <HeaderCustom />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280
            }}
          >
            <Routes />
          </Content>
        </Layout>
      </Layout>
    </Provider>
  )
}

export default Admin

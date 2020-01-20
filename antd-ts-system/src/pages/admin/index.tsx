import React from 'react'
import { Layout, Icon, message } from 'antd'
import Routes from '@/router'
import { RouteComponentProps } from 'react-router-dom';
// import Memory from '@/utils/memory'
import Storage from '@/utils/storage'
import SiderCustom from '@/components/SiderCustom'
import HeaderCustom from '@/components/HeaderCustom'


const { Header, Sider, Content } = Layout
const storage = new Storage()

const Admin: React.FC<RouteComponentProps> = ({ history }) => {
  const [collapsed, setCollapsed] = React.useState(false)

  React.useEffect(() => {
    const user = storage.get('USER_KEY')
    if (!user) {
      history.push('/login')
    } else {
      // message.success('Hello,' + user.username)
    }
  },[])

  return (
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
  )
}

export default Admin

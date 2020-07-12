import React from 'react'
import { withRouter } from 'react-router-dom'
import { Menu } from 'antd'
import classNames from 'classnames'

import '@/styles/layout/sidebar.less'
import { BasicPageRoutes } from '@/router'

const { SubMenu } = Menu

const Sidebar = props => {
  console.log(props.collapsed)
  return (
    <aside
      className={classNames('s1-sidebar', 's1-sidebar-fixed')}
      style={props.sidebarStyle}
    >
      <Menu mode="inline" theme="dark" inlineCollapsed={props.collapsed}>
        {BasicPageRoutes.map(menu => {
          if (menu.children) {
            return (
              <SubMenu key={menu.path} icon={<menu.icon />} title={menu.title}>
                {menu.children.map(menuChild => (
                  <Menu.Item
                    key={menuChild.path}
                    icon={menuChild.icon && <menuChild.icon />}
                    onClick={() => props.history.push(menuChild.path)}
                  >
                    {menuChild.title}
                  </Menu.Item>
                ))}
              </SubMenu>
            )
          } else {
            return (
              <Menu.Item
                key={menu.path}
                icon={menu.icon && <menu.icon />}
                onClick={() => props.history.push(menu.path)}
              >
                {menu.title}
              </Menu.Item>
            )
          }
        })}
      </Menu>
    </aside>
  )
}

export default withRouter(Sidebar)

import React, { FC, memo, SetStateAction } from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import './header.less';

export interface HeaderProps {
  collapsed: boolean;
  toggleCollapsed: (param: boolean) => void;
}

const Header: FC<HeaderProps> = memo(props => {
  const { collapsed, toggleCollapsed } = props;

  const menu = (
    <Menu>
      <Menu.Item>
        <span className="logout-menu">
          <LogoutOutlined />
          退出登录
        </span>
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="s1-header">
      <div className="s1-header-container">
        <div className="s1-header-left">
          <div className="collapse" onClick={() => toggleCollapsed(!collapsed)}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            )}
          </div>
        </div>
        <div className="s1-header-right">
          <Dropdown
            overlay={menu}
            placement="bottomCenter"
            overlayStyle={{ minWidth: 140 }}
          >
            <div className="avatar-wrapper">
              <Avatar src={require('@/assets/logo.png')} />
              <span className="username">EchOneJY</span>
            </div>
          </Dropdown>
        </div>
      </div>
    </header>
  );
});

export default Header;

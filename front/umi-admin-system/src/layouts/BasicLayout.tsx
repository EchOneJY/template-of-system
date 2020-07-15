import React, { FC, useState, ReactChildren } from 'react';
import classNames from 'classnames';

import Header from './components/header';
import Sidebar from './components/sidebar';

import './BasicLayout.less';

interface BasicProps {
  children: ReactChildren;
}

const BasicLayout: FC<BasicProps> = props => {
  const [collapsed, toggleCollapsed] = useState(false);

  const sidebarStyle = collapsed
    ? { width: '48px', flex: '0 0 48px', overflow: 'hidden' }
    : { width: '208px', flex: '0 0 208px', overflow: 'hidden' };

  return (
    <div className={classNames('s1-basic-layout', { collapsed })}>
      <div style={sidebarStyle}></div>
      <Sidebar collapsed={collapsed} sidebarStyle={sidebarStyle} />
      <div className="s1-layout">
        <Header collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
        <main className="s1-main">{props.children}</main>
      </div>
    </div>
  );
};

export default BasicLayout;

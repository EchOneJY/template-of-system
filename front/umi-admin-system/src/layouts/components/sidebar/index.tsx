import React, { FC, memo, CSSProperties, useState, useEffect } from 'react';
import { withRouter } from 'umi';
import { RouteComponentProps } from 'react-router';
import { Menu } from 'antd';
import classNames from 'classnames';

import './sidebar.less';
import { queryRoutes } from './service';
import { iconConfig, IconKey } from '@/utils/routes';

const { SubMenu } = Menu;

interface SidebarType extends RouteComponentProps {
  collapsed: boolean;
  sidebarStyle: CSSProperties;
}

interface RouteType {
  path: string;
  title: string;
  icon: IconKey;
  children?: RouteType[];
  iconComponent?: any;
}

const Sidebar: FC<SidebarType> = props => {
  const [routeList, setRouteList] = useState<RouteType[]>([]);
  useEffect(() => {
    queryRoutes().then(res => {
      res.forEach(
        (route: RouteType) => (route.iconComponent = iconConfig[route.icon]),
      );
      setRouteList(res);
    });
  }, []);

  return (
    <aside
      className={classNames('s1-sidebar', 's1-sidebar-fixed')}
      style={props.sidebarStyle}
    >
      <Menu mode="inline" theme="dark" inlineCollapsed={props.collapsed}>
        {routeList.map(menu => {
          if (menu.children) {
            return (
              <SubMenu
                key={menu.path}
                icon={<menu.iconComponent />}
                title={menu.title}
              >
                {menu.children.map(menuChild => (
                  <Menu.Item
                    key={menuChild.path}
                    icon={
                      menuChild.iconComponent && <menuChild.iconComponent />
                    }
                    onClick={() => props.history.push(menuChild.path)}
                  >
                    {menuChild.title}
                  </Menu.Item>
                ))}
              </SubMenu>
            );
          } else {
            return (
              <Menu.Item
                key={menu.path}
                icon={<menu.iconComponent />}
                onClick={() => props.history.push(menu.path)}
              >
                {menu.title}
              </Menu.Item>
            );
          }
        })}
      </Menu>
    </aside>
  );
};

export default withRouter(Sidebar);

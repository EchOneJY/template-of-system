import React, { useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import classNames from 'classnames'

import { BasicPageRoutes } from '@/router'
import { getToken } from '@/utils/auth'

import Header from './components/Header'
import Sidebar from './components/Sidebar'

const BasicLayout = props => {
  const [collapsed, toggleCollapsed] = useState(false)

  const hasToken = getToken()
  if (!hasToken) {
    props.history.push(`/user/login`)
  }

  const loadRoutes = list => {
    const routes = list.map(item => {
      if (item.children) {
        return loadRoutes(item.children)
      } else {
        return (
          <Route
            key={item.path}
            path={item.path}
            component={item.component}
            exact
          />
        )
      }
    })

    return routes
  }

  const sidebarStyle = collapsed
    ? { width: '48px', flex: '0 0 48px', overflow: 'hidden' }
    : { width: '208px', flex: '0 0 208px', overflow: 'hidden' }

  return (
    <div className={classNames('s1-basic-layout', { collapsed })}>
      <div style={sidebarStyle}></div>
      <Sidebar collapsed={collapsed} sidebarStyle={sidebarStyle} />
      <div className="s1-layout">
        <Header collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
        <main className="s1-main">
          <Switch>
            {loadRoutes(BasicPageRoutes)}
            <Redirect to="/dashboard" />
          </Switch>
        </main>
      </div>
    </div>
  )
}

export default BasicLayout

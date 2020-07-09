import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'

import UserLayout from '@/layout/UserLayout'
import BasicLayout from '@/layout/BasicLayout'

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/user" component={UserLayout} />
        <Route path="/" component={BasicLayout} />
        <Redirect to="/404" />
      </Switch>
    </HashRouter>
  )
}

export default App

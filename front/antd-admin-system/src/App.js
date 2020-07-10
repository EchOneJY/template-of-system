import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from '@/store'
import UserLayout from '@/layout/UserLayout'
import BasicLayout from '@/layout/BasicLayout'

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          <Route path="/user" component={UserLayout} />
          <Route path="/" component={BasicLayout} />
          <Redirect to="/404" />
        </Switch>
      </HashRouter>
    </Provider>
  )
}

export default App

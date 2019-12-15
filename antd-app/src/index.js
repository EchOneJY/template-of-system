import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Register from '@/pages/register'
import Login from '@/pages/login'
import Main from '@/pages/main'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <Route exact component={Main} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
)

import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Particles from 'react-particles-js'
import particleConfig from '@/pages/user/particle.js'
import Login from '@/pages/user/login'

const UserLayout = props => {
  return (
    <div className="s1-user-layout">
      <Particles className="particle-canvas" params={particleConfig} />
      <Switch>
        <Route path="/user/login" component={Login} exact />
        <Redirect to="/user/login" />
      </Switch>
    </div>
  )
}

export default UserLayout

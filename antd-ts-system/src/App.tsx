import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from '@/pages/login'
import Admin from '@/pages/admin'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/admin" exact component={Admin} />
        <Redirect to="/login"/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

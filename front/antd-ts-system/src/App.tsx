import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '@/store'
import Login from '@/pages/login'
import Admin from '@/pages/admin'

const App: React.FC = () => {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/" component={Admin} />
        <Redirect to="/"/>
      </Switch>
    </BrowserRouter>
    </Provider>
  );
}

export default App;

/*
 * @Author: EchOne
 * @Date: 2019-08-14 09:48:20
 * @LastEditors: EchOne
 * @LastEditTime: 2019-08-14 18:23:04
 * @Description: file content
 */
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/login';
import Admin from './pages/admin';

class App extends Component {
    render() {
        return(
            <BrowserRouter>
                <Switch>
                    <Route path="/login" exact component={Login}/>   
                    <Route path="/" component={Admin} />   
                </Switch>
            </BrowserRouter>
        )
    }
}
 
export default App;

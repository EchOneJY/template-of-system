/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 09:38:46
 * @LastEditTime: 2019-08-14 17:58:12
 * @LastEditors: EchOne
 */
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import routesConfig from './config';

class RouterConfig extends Component {
    state = {  }
    render() { 
        return (  
            <Switch>
               {
                    routesConfig.map((item,key) => {
                        return <Route 
                                    key={item.path+key} 
                                    path={item.path} 
                                    render={props => (
                                        <item.component {...props} routes={item.routes} />
                                    )}
                                 />
                    })
               }
               <Redirect to="/home"/>
            </Switch>
        );
    }
}
 

export default RouterConfig;
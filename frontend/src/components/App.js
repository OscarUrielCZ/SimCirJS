import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './Login';
import NoLogin from './NoLogin';
import Dashboard from './Dashboard';
import Workspace from './Workspace';

export default class App extends Component {
    render() {
        return (
            <BrowserRouter basename='/circuits'>
                <Switch>
                    <Route exact path='/' component={ Login } />
                    <Route exact path='/dashboard' component={ Dashboard }/>
                    <Route exact path='/login-error' component={ NoLogin } />
                    <Route exact path='/create' component={ Workspace } />
                </Switch>
            </BrowserRouter>
        );
    }
}
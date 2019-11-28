import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './Login';
import Dashboard from './Dashboard';
import Workspace from './Workspace';
import View from './View';
import Delete from './Delete';
import Modify from './Modify';

export default class App extends Component {
    render() {
        return (
            <BrowserRouter basename='/circuits'>
                <Switch>
                    <Route exact path='/' component={ Login } />
                    <Route exact path='/dashboard' component={ Dashboard }/>
                    <Route exact path='/create' component={ Workspace } />
                    <Route exact path='/view/:id' component={ View } />
                    <Route exact path='/delete/:id' component={ Delete } />
                    <Route exact path='/modify/:id' component={ Modify } />
                </Switch>
            </BrowserRouter>
        );
    }
}
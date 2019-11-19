import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import global from '../global';
import './general.css';

export default class Login extends Component {
    state = {
        user: {
            username: '',
            password: ''
        },
        error: false,
        redirect: false
    };
    
    handleSubmit = e => {
        e.preventDefault();

        fetch(`${global.getURL()}/Home?username=${this.state.user.username}&password=${this.state.user.password}`)
            .then(resp => resp.json())
            .then(resp => {
                if(resp.ok == "true") {
                    localStorage.setItem('session', JSON.stringify({ username: resp.response}));
                    this.setState({
                        redirect: true
                    })
                } else {
                    this.setState({
                        error: true
                    })
                }
            });
    };

    handleChange = e => {
        this.setState({
            user: {
                ...this.state.user,
                [e.target.name]: e.target.value
            }
        });
    }

    renderError() {
        if(this.state.error)
            return (
                <div class="alert alert-danger">Usuario o contraseña incorrectos</div>
            );
    }

    renderRedirect() {
        if(this.state.redirect)
            return <Redirect to="/dashboard" />;
    }

    render() {
        return (
            <div className="container">
                <div className="display-4">Ingresa a SimCirJS</div>
                <div id="login-box" class="card">
                    <div class="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className='form-group'>
                                <label for='username'>Nombre de usuario</label>
                                <input type='text' name='username' className='form-control' onChange={this.handleChange} />
                            </div>
                            <div className='form-group'>
                                <label for='password'>Contraseña</label>
                                <input type='password' name='password' className='form-control' onChange={this.handleChange} />
                            </div>
                            { this.renderError() }
                            { this.renderRedirect() }
                            <input type='submit' value='Ingresar' className='form-control' />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
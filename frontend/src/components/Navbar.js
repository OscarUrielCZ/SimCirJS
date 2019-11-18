import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

export default class Navbar extends Component {
    state = {
        redirect: false
    };

    componentWillMount() {
        const user = JSON.parse(localStorage.getItem('session'));
        if(user == null) {
            this.setState({
                redirect: true
            });
        }
    }

    renderRedirect() {
        if(this.state.redirect)
            return <Redirect to='/' />;
    }

    removeLS() {
        localStorage.removeItem('session');
    }

    render() {
        return (
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                { this.renderRedirect() }
                <Link className='navbar-brand' to='/dashboard'>Bienvenido {this.props.username}</Link>
                <ul className='navbar-nav ml-auto'>
                    <li className='nav-item active'>
                        <Link className='nav-link' to='/dashboard'>Dashboard</Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link' to='/create'>Nuevo circuito</Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link' onClick={this.removeLS} to='/'>Cerrrar sesión</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}
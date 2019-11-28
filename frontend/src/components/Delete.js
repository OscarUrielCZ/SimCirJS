import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Navbar from './Navbar';
import global from '../global';

export default class Dashboard extends Component {
    state = {
        user: {
            username: ''
        }
    };

    componentWillMount() {
        const user = JSON.parse(localStorage.getItem('session'));
        if(user != null) {
            this.setState({
                user: {
                    ...this.state.user,
                    username: user.username
                }
            });
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        fetch(`${global.getURL()}/RemoveCircuit?id=${this.props.match.params.id}`)
            .then(resp => {
                alert("Borrado exitosamente");
            });
    };

    render() {
        return (
            <div>
                <Navbar username={this.state.user.username} />
                <div className="conatiner">
                    <form onSubmit={this.handleSubmit}>
                        <input className="form-control" type="submit" value="Presiona para borrar" />
                    </form>    
                </div>
            </div>
        );
    }
}
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Navbar from './Navbar';

export default class Dashboard extends Component {
    state = {
        user: {
            username: '',
            projects: []
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
            fetch(`http://localhost:8090/circuits/DashboardServlet?username=${user.username}`)
                .then(resp => resp.json())
                .then(resp => {
                    this.setState({
                        user: {
                            ...this.state.user,
                            projects: resp.projects
                        }
                    })
                });
        }
    }

    renderProjectTable() {
        for(let project of this.state.user.projects)
            return (
                <tr>
                    <td>{project.id}</td>
                    <td>{project.name}</td>
                    <td>Ver|Editar|Borrar</td>
                </tr>
            );
    }

    render() {
        return (
            <div>
                <Navbar username={this.state.user.username} />
                <div className="container">
                    <table className='table table-striped'>
                        <tr>
                            <td>ID</td>
                            <td>Nombre del circuito</td>
                            <td>Acciones</td>
                        </tr>
                        { this.renderProjectTable() }
                    </table>
                </div>
            </div>
        );
    }
}
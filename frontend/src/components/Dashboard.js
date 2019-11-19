import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

import Navbar from './Navbar';
import global from '../global';

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
            fetch(`${global.getURL()}/DashboardServlet?username=${user.username}`)
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
                    <td>
                        <Link className='p-action' to={`/view/${project.id}`} ><i class="fas fa-eye"></i></Link>
                        <Link className='p-action' to={`/edit/${project.id}`} ><i class="fas fa-pen"></i></Link>
                        <Link className='p-action' to={`/delete/${project.id}`} ><i class="fas fa-trash"></i></Link>
                    </td>
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
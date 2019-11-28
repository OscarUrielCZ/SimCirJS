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
                    console.log(resp);
                    this.setState({
                        user: {
                            ...this.state.user,
                            projects: resp.projects
                        }
                    });
                });
        }
    }

    removeCircuit = id => {
        
        if(confirm('¿Seguro que quieres borrar el proyecto?')) {
            fetch(`${global.getURL()}/RemoveCircuit?id=${id}`)
            .then(resp => {
                window.location.reload();
            });
        }
    }

    renderProject(project) {
        return (
            <tr>
                <td>{project.id}</td>
                <td>{project.name}</td>
                <td>
                    <Link className='p-action' to={`/view/${project.id}`} ><i class="fas fa-eye">Ver</i></Link>
                    <Link className='p-action' to={`/modify/${project.id}`} ><i class="fas fa-pen">Editar</i></Link>
                    <Link className='p-action' to={`/delete/${project.id}`} ><i class="fas fa-trash">Borrar</i></Link>
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
                        { this.state.user.projects.map(project => this.renderProject(project)) }
                    </table>
                </div>
            </div>
        );
    }
}
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import uuid from 'uuid';

import Navbar from './Navbar';
import global from '../global';

export default class Workspace extends Component {
    state = {
        user: {
            username: ''
        },
        circuit: {
            name: '',
            data: '',
        },
        redirect: false
    };

    componentWillMount() {
        const user = JSON.parse(localStorage.getItem('session'));
        if(user != null) {
            this.setState({
                user: {
                    username: user.username
                }
            });
        }
    }

    handleChange = e => {
        this.setState({
            circuit: {
                ...this.state.circuit,
                [e.target.name]: e.target.value
            }
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        let data = JSON.parse(this.state.circuit.data);
        let ndevices = data.devices.length;
        let nconnectors = data.connectors.length;
        let url = `${global.getURL()}/SaveCircuit?id=${uuid()}&username=${this.state.user.username}&name=${this.state.circuit.name}&`;

        url += `ndevices=${ndevices}&`;
        url += `nconnectors=${nconnectors}&`;

        for(let i=0; i<ndevices; i++)
            url += `dt${i}=${data.devices[i].type}&di${i}=${data.devices[i].id}&dl${i}=${data.devices[i].label}&dx${i}=${data.devices[i].x}&dy${i}=${data.devices[i].y}&`;
        for(let i=0; i<nconnectors; i++)
            url += `cf${i}=${data.connectors[i].from}&ct${i}=${data.connectors[i].to}`;

        fetch(url)
            .then(resp => resp.json())
            .then(resp => {
                if(resp.ok) {
                    alert(`${this.state.circuit.name} guardado exitosamente`);
                    this.setState({
                        redirect: true
                    })
                } else {
                    alert('Algo salió mal, vuelve a intentar');
                }
            });
    };

    renderArea() {
        return (
            <div className='simcir'>
                {'{'}
                    "width": 600,
                    "height": 350                            
                {'}'}
            </div>
        );
    }

    renderRedirect() {
        if(this.state.redirect)
            return <Redirect to="/dashboard" />;
    }
    
    render() {
        return (
            <div>
                <Navbar username={this.state.user.username} />
                { this.renderRedirect() }
                <div className='container'>
                    <div className='display-4'>Crea tu circuito</div>
                    <div className='row justify-content-center'>
                        <div className='col-lg-8 col-md-12'>
                            { this.renderArea() }
                        </div>
                        <div className='col-lg-4 col-md-12'>
                            <div className='row'>
                                <div className='col-lg-12 col-md-6 card'>
                                    <div className='card-body'>
                                        <p className='card-text'>
                                            1. Da Ctrl+click sobre el circuito<br />
                                            2. Copia y pega la info abajo<br />
                                            3. Presiona el botón de guardar
                                        </p>
                                    </div>
                                </div>
                                <form onSubmit={this.handleSubmit} id='form-sp' className='col-lg-12 col-md-6'>
                                    <div className='form-group'>
                                        <input type='text' name='name' className='form-control' placeholder='Nombre del circuito' onChange={this.handleChange} />
                                    </div>
                                    <div className='form-group'>
                                        <textarea className='form-control' placeholder='Copia aqui las especificaciones' rows='5' id='circuitinfo' name='data' onChange={this.handleChange}></textarea>
                                        <input type='submit' className='form-control' id='savebtn' value='Guardar' />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
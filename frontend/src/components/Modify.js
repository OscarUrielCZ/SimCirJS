import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Navbar from './Navbar';
import Library from './Library';

import global from '../global';
import './general.css';

export default class Modufy extends Component {
    state = {
        user: {
            username: ''
        },
        circuit: {
            name: '',
            data: '',
            features: {},
            devices: '',
            connectors: ''
        },
        redirect: false
    };

    componentWillMount() {
        const user = JSON.parse(localStorage.getItem('session'));

        fetch(`${global.getURL()}/GetCircuit?id=${this.props.match.params.id}`)
            .then(resp => resp.json())
            .then(resp => {
                this.setState({
                    username: user.username,
                    circuit: {
                        name: resp.name,
                        features: resp.features,
                        devices: this.getdevices(resp.features.devices),
                        connectors: this.getconnectors(resp.features.connectors)
                    }
                });
            })
            .then(() => {
                this.setState({
                    circuit: {
                        ...this.state.circuit,
                        data: `{
"width": 600,
"height": 350,
"devices": [ ${ this.state.circuit.devices } ],
"connectors": [ ${ this.state.circuit.connectors } ]
}`
                    }
                });
            });
    }

    handleSubmit = e => {
        e.preventDefault();
        let data = JSON.parse(this.state.circuit.data);
        let ndevices = data.devices.length;
        let nconnectors = data.connectors.length;
        let url = `${global.getURL()}/ModifyCircuit?id=${this.props.match.params.id}&username=${this.state.user.username}&name=${this.state.circuit.name}&`;

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
                    alert(`${resp.name} actualizado exitosamente`);
                    this.setState({
                        redirect: true
                    })
                } else {
                    alert('Algo salió mal, vuelve a intentar');
                }
            });
    };

    handleChange = e => {
        this.setState({
            circuit: {
                ...this.state.circuit,
                [e.target.name]: e.target.value
            }
        });
    };

    getdevices(devices) {
        // let devices = this.state.circuit.features.devices;
        let result = '', mto = false;
        for(let i in devices) {
            if(mto) result += ',';
            result += `{"type":"${devices[i].type}","id":"${devices[i].id}","x":${devices[i].x},"y":${devices[i].y},"label":"${devices[i].label}"}`;
            mto = true;
        }
        return result;
    }

    getconnectors(connectors) {
        // let connectors = this.state.circuit.features.connectors;
        let result = '', mto = false;
        for(let i in connectors) {
            if(mto) result += ',';
            result += `{"from":"${connectors[i].from}","to":"${connectors[i].to}"}`;
            mto = true;
        }
        return result;
    }

    renderRedirect() {
        if(this.state.redirect)
            return <Redirect to='/dashboard' />;
    }

    render() {
        return (
            <div>
                <Navbar username={this.state.user.username} />
                { this.renderRedirect() }
                <div className='container'>
                    <div className='display-4'>Modifica tu circuito</div>
                    <div className='row justify-content-center'>
                        <div className='col-lg-8 col-md-12'>
                            <Library showToolbox={ "true" } devices={this.state.circuit.devices} connectors={this.state.circuit.connectors} />
                        </div>
                        <div className='col-lg-4 col-md-12'>
                            <form onSubmit={this.handleSubmit} id='form-sp' className='col-lg-12 col-md-12'>
                                <div className='form-group'>
                                    <input type='text' name='name' className='form-control' value={this.state.circuit.name} placeholder='Nuevo nombre del circuito' onChange={this.handleChange} />
                                </div>
                                <div className='form-group'>
                                    <textarea className='form-control' value={this.state.circuit.data} placeholder='Copia aqui las nuevas especificaciones' rows='9' id='circuitinfo' name='data' onChange={this.handleChange}></textarea>
                                </div>
                                <input type='submit' className='form-control' id='savebtn' value='Guardar' />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
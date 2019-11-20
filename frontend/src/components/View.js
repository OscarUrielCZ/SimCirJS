import React, { Component } from 'react';

import Navbar from './Navbar';
import global from '../global';
import './general.css';

export default class View extends Component {
    state = {
        username: '',
        circuit: {
            name: '',
            features: {},
        }
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
                    }
                });
            });
    }

    getdevices() {
        let devices = this.state.circuit.features.devices;
        let result = '', mto = false;
        for(let i in devices) {
            if(mto) result += ',';
            result += `{"type":"${devices[i].type}","id":"${devices[i].id}","x":${devices[i].x},"y":${devices[i].y},"label":"${devices[i].label}"}`;
            mto = true;
        }
        return result;
    }

    getconnectors() {
        let connectors = this.state.circuit.features.connectors;
        let result = '', mto = false;
        for(let i in connectors) {
            if(mto) result += ',';
            result += `{"from":"${connectors[i].from}","to":"${connectors[i].to}"}`;
            mto = true;
        }
        return result;
    }

    renderCircuitInfo() {
        let devices = this.getdevices();
        let connectors = this.getconnectors();
        let data = `
            "width":650,
            "height":360,
            "showToolbox":false,
            "devices":[
                ${devices}
            ],
            "connectors":[
                ${connectors}
            ]`;
        console.log(data);
        return data;
    }

    render() {
        return (
            <div>
                <Navbar username={this.state.username}/>
                <div className='container'>
                    <center>
                        <div id='circuit-view' className='simcir'>
                            {'{'}
                                { this.renderCircuitInfo() }
                            {'}'}
                        </div>
                        <h3 className='text-right'>{this.state.circuit.name}</h3>
                    </center>
                </div>
            </div>
        );
    }
}
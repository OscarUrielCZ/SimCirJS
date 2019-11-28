import React, { Component } from 'react';

// import '../libs/simcir';
// import '../libs/simcir.css';
// import '../libs/simcir-basicset';
// import '../libs/simcir-basicset.css';
// import '../libs/simcir-library';

import Navbar from './Navbar';
import Library from './Library';
import global from '../global';
import './general.css';


export default class View extends Component {
    state = {
        username: '',
        circuit: {
            name: '',
            features: {},
            devices: '',
            connectors: ''
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
                        devices: this.getdevices(resp.features.devices),
                        connectors: this.getconnectors(resp.features.connectors)
                    }
                });
            });
    }

    getdevices(devices) {
        // let devices = resp.features.devices;    
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
        // let connectors = resp.features.connectors;
        // let connectors = this.state.circuit.features.connectors;
        let result = '', mto = false;
        for(let i in connectors) {
            if(mto) result += ',';
            result += `{"from":"${connectors[i].from}","to":"${connectors[i].to}"}`;
            mto = true;
        }
        console.log(result);
        return result;
    }

    renderArea() {
        let info = `
            "width": 600,
            "height": 350,
            "showToolbox": false,
            "devices": [ ${ this.state.circuit.devices } ],
            "connectors": [ ${ this.state.circuit.connectors } ]
            `;
        console.log(info);
        return (
            <div id='circuit-view' className='simcir'>
                {'{'}
                    { info }
                {'}'}
            </div>
        );
    }

    renderLibrary() {
        //if(this.state.circuit.devices != '' && this.state.circuit.connectors != '')
            return <Library showToolbox={ "false" } devices={this.state.circuit.devices} connectors={this.state.circuit.connectors} />
    }

    render() {
        return (
            <div>
                <Navbar username={this.state.username} />
                <div className='container'>
                    <center>
                        { this.renderLibrary() }
                        <h3 className='text-right'>{this.state.circuit.name}</h3>
                    </center>
                </div>
            </div>
        );
    }
}
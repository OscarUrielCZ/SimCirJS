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
                    }
                });
            }).then(resp => {
                this.setState({
                    circuit: {
                        ...this.state.circuit,
                        devices: this.getdevices(),
                        connectors: this.getconnectors()
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
        console.log(result);
        return result;
    }

    render() {
        return (
            <div>
                <Navbar username={this.state.username}/>
                <div className='container'>
                    <center>
                        <div id='circuit-view' className='simcir'>
                            {'{'}
                                "width":650,
                                "height":360,
                                "showToolbox":false,
                                "devices":[{this.getdevices()}],
                                "connectors":[{this.getconnectors()}] 
                            {'}'}
                            {/* {'{'}"width":650, "height":360, "showToolbox":false, "devices":[{'{'}"type":"DC","id":"dev0","x":120,"y":128,"label":"DC"{'}'},{'{'}"type":"LED","id":"dev1","x":216,"y":128,"label":"LED"{'}'}], "connectors":[{'{'}"from":"dev1.in0","to":"dev0.out0"{'}'}]{'}'} */}
                        </div>
                        <h3 className='text-right'>{this.state.circuit.name}</h3>
                    </center>
                </div>
            </div>
        );
    }
}
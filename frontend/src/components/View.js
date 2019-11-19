import React, { Component } from 'react';

import Navbar from './Navbar';
import global from '../global';
import './general.css';

export default class View extends Component {
    state = {
        username: '',
        circuit: {
            name: '',
            features: {}
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
                        features: resp.features
                    }
                });
                console.log(resp.features);
                console.log(this.state.circuit.features);
            });
    }

    getStringElements(array) {
        let result = "[";
        //console.log(array);
        for(let element of array)
            //for(let property of element)
            console.log(`Element: ${element}`);
        
        result += "]";

        return result;
    }

    renderCircuitInfo() {
        return (`
            "width":650,
            "height":360,
            "showToolBox": false,
            "devices": ${this.getStringElements(this.state.circuit.features.devices)},
            "connectors": ${this.getStringElements(this.state.circuit.features.connectors)}
        `);
            
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
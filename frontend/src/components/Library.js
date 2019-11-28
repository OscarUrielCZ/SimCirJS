import React, { Component } from 'react';

export default class Library extends Component {
    render() {
        return (
            <div id='circuit-view' className='simcir'>
                {'{'}
                    "width": 600,
                    "height": 350,
                    "showToolbox": { this.props.showToolbox },
                    "devices": [ { this.props.devices } ],
                    "connectors": [ { this.props.connectors } ]
                {'}'}
            </div>
        );
    }
}
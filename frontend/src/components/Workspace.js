import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Navbar from './Navbar';

export default class Workspace extends Component {
    state = {
        user: {
            username: ''
        }
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
    
    render() {
        return (
            <div>
                <Navbar username={this.state.user.username} />
                <div className='container'>
                    <div className='display-4'>Crea tu circuito</div>
                    <div className='row justify-content-center'>
                        <div className='col-lg-8 col-md-12 simcir'>
                            {'{'}
                                "width":600,
                                "height":350
                            {'}'}
                        </div>
                        <div className='col-lg-4 col-md-12'>
                            <div className='row'>
                                <div className='col-lg-12 col-md-6 card'>
                                    <div className='card-body'>
                                        <p className='card-text'>
                                            1. Da ctrl + click sobre el circuito<br />
                                            2. Copia y pega la info en el area de texto <br />
                                            3. Guarda
                                        </p>
                                    </div>
                                </div>
                                <form id='form-sp' className='col-lg-12 col-md-6'>
                                    <div className='form-group'>
                                        <textarea className='form-control' placeholder='Copia aqui las especificaciones' rows='5' id='circuitinfo'></textarea>
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
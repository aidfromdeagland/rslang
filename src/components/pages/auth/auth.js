import React, { Component } from 'react';
import './auth.scss';
import { wordServiceTest, settingServiceTest, statisticServiceTest } from '../../../services/wordServicesTest';

export class Auth extends Component {
    constructor() {
        super();
        // wordServiceTest();
        settingServiceTest();
        // statisticServiceTest();
    }

    render() {
        return (
            <div className="auth">
                <h1>Authentication</h1>
            </div>
        );
    }
}

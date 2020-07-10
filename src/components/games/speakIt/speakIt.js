import React, { Component } from 'react';
import './speakit.scss';
import { StartPage } from './startPage';

export class SpeakIt extends Component {
    render() {
        return (
            <div className="speakit">
                <StartPage />
            </div>
        );
    }
}

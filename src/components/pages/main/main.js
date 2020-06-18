import React, { Component } from 'react';
import './main.scss';
import { Options } from './Options';
import { Progress } from './Progress';

export class Main extends Component {
    render() {
        return (
            <div className="main-page">
                <div className="main-page-container">
                    <Options />
                    <Progress />
                </div>
            </div>
        );
    }
}

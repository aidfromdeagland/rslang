import React, { Component } from 'react';
import './main.scss';
import { Options } from './Options';
import { Progress } from './Progress';
import { Start } from './Start';

export class Main extends Component {
    render() {
        return (
            <div className="main-page">
                <div className="main-page-container">
                    <Options />
                    <Start />
                    <Progress />
                </div>
            </div>
        );
    }
}

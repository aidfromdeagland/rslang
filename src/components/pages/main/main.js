import React, { Component } from 'react';
import './main.scss';
import { Options } from './Options';
import { Progress } from './Progress';
import { Start } from './Start';

export class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            learnedWordsToday: 0,
            needLearnWordsToday: 0,
            totalLearnedWords: 0,
        };
    }


    render() {
        return (
            <div className="main-page">
                <div className="main-page-container">
                    <Options needLearnWordsToday={this.state.needLearnWordsToday} />
                    <Start />
                    <Progress />
                </div>
            </div>
        );
    }
}

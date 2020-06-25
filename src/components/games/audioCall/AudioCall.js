/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import './audioCall.scss';
import { AudioCallGame } from './AudioCallGame';
import { AudioCallStart } from './AudioCallStart';

export class AudioCall extends Component {
    constructor() {
        super();
        this.state = { isStartPage: true };
    }

    startGame(repository) {
        this.setState({
            isStartPage: false,
            repository,
        });
    }

    render() {
        return (
            <div className="audio-call">
                { this.state.isStartPage
                    ? <AudioCallStart startGame={(repository) => this.startGame(repository)} />
                    : <AudioCallGame repository={this.state.repository} /> }
            </div>
        );
    }
}

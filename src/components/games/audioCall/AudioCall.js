/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import './audioCall.scss';
import { AudioCallGame } from './AudioCallGame';
import { AudioCallStart } from './AudioCallStart';
import { gameProgress } from './constants';

export class AudioCall extends Component {
    constructor() {
        super();
        this.state = { state: gameProgress.start };
    }

    startGame(repository) {
        this.setState({
            state: gameProgress.game,
            repository,
        });
    }

    endGame(result) {
        this.setState({
            state: gameProgress.result,
            repository: undefined,
            gameResult: result,
        });
    }

    render() {
        let body;
        switch (this.state.state) {
        case gameProgress.start:
            body = (
                <AudioCallStart
                    repository={this.state.repository}
                    modeIsUserWords={false}
                    startGame={(repository) => this.startGame(repository)}
                />
            );
            break;
        case gameProgress.game:
            body = (
                <AudioCallGame
                    repository={this.state.repository}
                    endGame={(result) => this.endGame(result)}
                />
            );
            break;
        case gameProgress.result:
        default:
            body = (
                this.state.gameResult.map((o) => <span key={o.world.id}>{`${o.world.word} - ${o.correct}`}</span>)
            );
            break;
        }

        return (
            <div className="audio-call">
                {body}
            </div>
        );
    }
}

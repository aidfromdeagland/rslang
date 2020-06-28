/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import './audioCall.scss';
import { AudioCallStart } from './AudioCallStart';
import { AudioCallGame } from './AudioCallGame';
import { AudioCallResult } from './AudioCallResult';
import { gameProgress } from './constants';
import { groupCount, pageCount } from '../../../constants/globalConstants';

export class AudioCall extends Component {
    constructor() {
        super();
        this.state = { state: gameProgress.start };
    }

    startGame(repository, group, page) {
        this.setState({
            state: gameProgress.game,
            group,
            page,
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

    nextGame() {
        let { group, page } = this.state;
        page += 1;
        if (page >= pageCount) {
            page = 0;
            group += 1;
            if (group >= groupCount) {
                page = 0;
                group = 0;
            }
        }
        this.setState({
            state: gameProgress.start,
            page,
            group,
            repository: undefined,
            gameResult: undefined,
        });
    }

    render() {
        switch (this.state.state) {
        case gameProgress.start:
            return (
                <AudioCallStart
                    repository={this.state.repository}
                    modeIsUserWords={false}
                    startGame={(repository, group, page) => this.startGame(repository, group, page)}
                    page={this.state.page}
                    group={this.state.group}
                />
            );
        case gameProgress.game:
            return (
                <AudioCallGame
                    repository={this.state.repository}
                    endGame={(result) => this.endGame(result)}
                />
            );
        case gameProgress.result:
        default:
            return (
                <AudioCallResult
                    gameResult={this.state.gameResult}
                    nextGame={() => this.nextGame()}
                />
            );
        }
    }
}

/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import './audioCall.scss';
import { AudioCallGame } from './AudioCallGame';
import { AudioCallStart } from './AudioCallStart';
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
        let body;
        switch (this.state.state) {
        case gameProgress.start:
            body = (
                <AudioCallStart
                    repository={this.state.repository}
                    modeIsUserWords={false}
                    startGame={(repository, group, page) => this.startGame(repository, group, page)}
                    page={this.state.page}
                    group={this.state.group}
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
                <div>
                    <div className="audio-call__result-list">{this.state.gameResult.map((o) => <span key={o.word.id}>{`${o.word.word} - ${o.correct}`}</span>)}</div>
                    <button className="audio-call__button" type="button" onClick={() => this.nextGame()}>Next game</button>
                </div>
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

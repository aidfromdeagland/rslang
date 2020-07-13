/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './audioCall.scss';
import { AudioCallStart } from './audioCallStart';
import { AudioCallGame } from './audioCallGame';
import { AudioCallResult } from './audioCallResult';
import { GAME_PROGRESS } from './constants';
import { Repository } from './repository';
import { Auth } from '../../pages/auth/auth';
import { tryExecute } from './utils';
import { convertStatisticJson } from '../../../utils/utils';
import { StatisticService } from '../../../services/statisticServices';
import { Spinner } from '../../shared/spinner';

export class AudioCall extends Component {
    constructor(props) {
        super(props);
        this.state = { auth: true, state: GAME_PROGRESS.start };
    }

    errorFunction = (error, failedFunction, label) => {
        if (error.status === 401) {
            this.setState({ auth: false, failedFunction });
        } else {
            const errorMessage = typeof error !== 'string' ? error.message : error;
            const text = label ? `${label}: ${errorMessage}` : errorMessage;
            this.props.setMessage(text);
        }
    }

    afterAuth() {
        const { failedFunction } = this.state;
        failedFunction();
        this.setState({ auth: true, failedFunction: undefined });
    }

    startGame(repositoryState) {
        this.setState({
            state: GAME_PROGRESS.game,
            repositoryState,
        });
    }

    endGame(result) {
        this.setState({ isLoading: true });
        tryExecute(async () => {
            const newRepositoryState = await Repository.setNextGame(this.state.repositoryState);
            await this.saveStatistics(result);
            this.setState({
                state: GAME_PROGRESS.result,
                gameResult: result,
                repositoryState: newRepositoryState,
                isLoading: false,
            });
        }, this.errorFunction);
    }

    nextGame() {
        this.setState({
            state: GAME_PROGRESS.start,
            gameResult: undefined,
        });
    }

    // eslint-disable-next-line class-methods-use-this
    async saveStatistics(result) {
        const loadStatistic = await StatisticService.get();
        const audioCallStatistic = JSON.parse(loadStatistic.optional.audioCall || '[]');
        const roundStatistic = StatisticService.createGameStat(
            result.filter((o) => o.isCorrect).length,
            result.filter((o) => !o.isCorrect).length,
        );
        audioCallStatistic.push(roundStatistic);
        const audioCallStatisticJson = convertStatisticJson(audioCallStatistic);
        loadStatistic.optional.audioCall = audioCallStatisticJson;
        await StatisticService.put(loadStatistic);
    }

    render() {
        if (!this.state.auth) {
            return (
                <div className="audio-call">
                    <Auth isChecking={false} logIn={() => { this.afterAuth(); }} />
                </div>
            );
        }
        if (this.state.isLoading) {
            return (
                <div className="audio-call">
                    <Spinner />
                </div>
            );
        }
        switch (this.state.state) {
        case GAME_PROGRESS.start:
            return (
                <AudioCallStart
                    repositoryState={this.state.repositoryState}
                    startGame={(repositoryState) => this.startGame(repositoryState)}
                    errorFunction={this.errorFunction}
                />
            );
        case GAME_PROGRESS.game:
            return (
                <AudioCallGame
                    repositoryState={this.state.repositoryState}
                    endGame={(result) => this.endGame(result)}
                    errorFunction={this.errorFunction}
                />
            );
        case GAME_PROGRESS.result:
        default:
            return (
                <AudioCallResult
                    gameResult={this.state.gameResult}
                    nextGame={() => this.nextGame()}
                    modeLangGame={this.state.repositoryState.currentSettings.modeLangGame}
                />
            );
        }
    }
}

AudioCall.propTypes = {
    setMessage: PropTypes.func.isRequired,
};

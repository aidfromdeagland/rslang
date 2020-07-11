/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './audioCall.scss';
import { AudioCallStart } from './audioCallStart';
import { AudioCallGame } from './audioCallGame';
import { AudioCallResult } from './audioCallResult';
import { GAME_PROGRESS, MODE_GAME } from './constants';
import { Repository } from './repository';
import { Auth } from '../../pages/auth/auth';
import { tryExecute } from './utils';
import { convertStatisticJson } from '../../../utils/utils';
import { StatisticService } from '../../../services/statisticServices';
import { Spinner } from '../../shared/spinner';

// TODO Не реализовано (этот текст впоследствии обязательно удалю):
// * Периодическое повторение!
// * --переводы слов, из которых выбирается нужный, относятся к одной части речи
// * Отображать ошибку во всплывающем окне
// * При игре в слова пользователя не брать удалённые слова
// Доп функционал:
// * сбросить на настройки по умолчанию
// * сбросить статистику игры
// * искать английские слова по произнесённому русскому
export class AudioCall extends Component {
    constructor(props) {
        super(props);
        this.state = { auth: true, state: GAME_PROGRESS.start };
    }

    errorFunction = (error, failedFunction) => {
        if (error.status === 401) {
            this.setState({ auth: false, failedFunction });
        } else {
            this.props.setMessage(error.message);
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
            await this.saveStatistics(result, this.state.repositoryState);
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
    async saveStatistics(result, repositoryState) {
        const loadStatistic = await StatisticService.get();
        const audioCallStatistic = JSON.parse(loadStatistic.optional.audioCall || '[]');
        const isLevelMode = repositoryState.load.loaded.modeGame === MODE_GAME['All words'];
        const roundStatistic = StatisticService.createGameStat(
            result.filter((o) => o.isCorrect).length,
            result.filter((o) => !o.isCorrect).length,
            isLevelMode ? repositoryState.load.loaded.group : undefined,
            isLevelMode ? repositoryState.load.loaded.page : undefined,
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
                />
            );
        }
    }
}

AudioCall.propTypes = {
    setMessage: PropTypes.func.isRequired,
};

/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import './audioCall.scss';
import { AudioCallStart } from './audioCallStart';
import { AudioCallGame } from './audioCallGame';
import { AudioCallResult } from './audioCallResult';
import { GAME_PROGRESS } from './constants';
import { Repository } from './repository';
import { Auth } from '../../pages/auth/auth';
import { tryExecute } from './utils';

// TODO Не реализовано (этот текст впоследствии обязательно удалю):
// * переводы слов, из которых выбирается нужный, относятся к одной части речи
// * по умолчанию в мини-играх задействованы выученные пользователем слова.
//      Если таких слов недостаточно, игра запускается с первого раунда первого уровня
// * игра передаёт статистику в основную часть приложения
// * ведётся долгосрочная статистика мини-игр, можно посмотреть когда и сколько раз в какую
//      мини-игру играли и с каким результатом. Для хранения статистики используется бекэнд
// * Большие фразы не влезают на экран. Надо менять стиль
// * Обновление токена, при приближении времени завершения его действия (не обязательно, т.к.
//      проверить это будет невозможно)
// Доп функционал:
// * сбросить на настройки по умолчанию
// * искать английские слова по произнесённому русскому
export class AudioCall extends Component {
    constructor() {
        super();
        this.state = { auth: true, state: GAME_PROGRESS.start };
    }

    errorFunction = (error, failedFunction) => {
        if (error.status === 401) {
            this.setState({ auth: false, failedFunction });
        } else {
            // отобразить ошибку error.message
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
        tryExecute(async () => {
            const newRepositoryState = await Repository.setNextGame(this.state.repositoryState);
            this.setState({
                state: GAME_PROGRESS.result,
                gameResult: result,
                repositoryState: newRepositoryState,
            });
        }, this.errorFunction);
    }

    nextGame() {
        this.setState({
            state: GAME_PROGRESS.start,
            gameResult: undefined,
        });
    }

    render() {
        if (!this.state.auth) {
            return (
                <div className="audio-call">
                    <Auth isChecking={false} logIn={() => { this.afterAuth(); }} />
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

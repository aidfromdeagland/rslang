/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import './audioCall.scss';
import { AudioCallStart } from './audioCallStart';
import { AudioCallGame } from './audioCallGame';
import { AudioCallResult } from './audioCallResult';
import { GAME_PROGRESS } from './constants';
import { Repository } from './repository';
import { Auth } from '../../pages/auth/auth';

// TODO Не реализовано (этот текст впоследствии обязательно удалю):
// * переводы слов, из которых выбирается нужный, относятся к одной части речи
// * по умолчанию в мини-играх задействованы выученные пользователем слова.
//      Если таких слов недостаточно, игра запускается с первого раунда первого уровня
// * игра передаёт статистику в основную часть приложения
// * ведётся долгосрочная статистика мини-игр, можно посмотреть когда и сколько раз в какую
//      мини-игру играли и с каким результатом. Для хранения статистики используется бекэнд
// * Большие фразы не влезают на экран. Надо менять стиль
// Доп функционал:
// * выбор игры с пользовательскими или всеми словами (если слов пользователя хватает)
// * настройка количества слов в раунде
// * настройка стартового и финишного цвета фона
export class AudioCall extends Component {
    constructor() {
        super();
        this.state = { state: GAME_PROGRESS.start, auth: false };
    }

    setAuth() {
        this.setState({ auth: true });
    }

    startGame(repositoryState) {
        this.setState({
            state: GAME_PROGRESS.game,
            repositoryState,
        });
    }

    endGame(result) {
        let { repositoryState } = this.state;
        repositoryState = Repository.setNextGame(repositoryState);
        this.setState({
            state: GAME_PROGRESS.result,
            gameResult: result,
            repositoryState,
        });
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
                    <Auth isChecking logIn={() => { this.setAuth(); }} />
                </div>
            );
        }
        switch (this.state.state) {
        case GAME_PROGRESS.start:
            return (
                <AudioCallStart
                    repositoryState={this.state.repositoryState}
                    startGame={(repositoryState) => this.startGame(repositoryState)}
                />
            );
        case GAME_PROGRESS.game:
            return (
                <AudioCallGame
                    repositoryState={this.state.repositoryState}
                    endGame={(result) => this.endGame(result)}
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

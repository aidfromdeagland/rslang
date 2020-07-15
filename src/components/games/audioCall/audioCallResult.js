/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WordInResult } from './wordInResult';

export class AudioCallResult extends Component {
    render() {
        const { modeLangGame } = this.props;
        const corrects = this.props.gameResult.filter((o) => o.isCorrect);
        const notCorrects = this.props.gameResult.filter((o) => !o.isCorrect);
        return (
            <div className="audio-call">
                <div className="audio-call__result">
                    <div className="audio-call__result-subheader">
                        <span className="result-subheader__text">Errors</span>
                        <span className="result-subheader__count result-subheader__count_error">{notCorrects.length}</span>
                    </div>
                    <div className="audio-call__result-list">{notCorrects.map((o) => <WordInResult key={o.word.id} word={o.word} modeLangGame={modeLangGame} />)}</div>
                    <div className="audio-call__result-subheader">
                        <span className="result-subheader__text">Success</span>
                        <span className="result-subheader__count result-subheader__count_success">{corrects.length}</span>
                    </div>
                    <div className="audio-call__result-list">{corrects.map((o) => <WordInResult key={o.word.id} word={o.word} modeLangGame={modeLangGame} />)}</div>
                    <button className="audio-call__button" type="button" onClick={() => this.props.nextGame()}>Next game</button>
                </div>
            </div>
        );
    }
}

AudioCallResult.propTypes = {
    gameResult: PropTypes.arrayOf(PropTypes.shape({
        word: PropTypes.shape,
        isCorrect: PropTypes.shape,
    })).isRequired,
    nextGame: PropTypes.func.isRequired,
    modeLangGame: PropTypes.number.isRequired,
};

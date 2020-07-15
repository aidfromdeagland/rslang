/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MEDIA_PREFIX_URL } from '../../../constants/globalConstants';
import { getTextWord } from './utils';

export class WordInResult extends Component {
    handleSpeak() {
        if (!this.audio) {
            this.audio = new Audio(MEDIA_PREFIX_URL + this.props.word.audio);
        }
        this.audio.play();
    }

    render() {
        const { word, modeLangGame } = this.props;
        return (
            <div className="audio-call__result-word">
                <span className="audio-call__dinamic" onMouseDown={() => this.handleSpeak()} tabIndex="0" role="button"> </span>
                <span className="result-word__word">{`${getTextWord(word, modeLangGame, true)}`}</span>
                <span className="result-word__separator">—</span>
                <span className="result-word__translate">{getTextWord(word, modeLangGame, false)}</span>
            </div>
        );
    }
}

WordInResult.propTypes = {
    word: PropTypes.shape({
        id: PropTypes.string.isRequired,
        word: PropTypes.string.isRequired,
        wordTranslate: PropTypes.string.isRequired,
        audio: PropTypes.string.isRequired,
    }).isRequired,
    modeLangGame: PropTypes.number.isRequired,
};

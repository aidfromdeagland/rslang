/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WordList } from './wordList';
import { fileResource } from '../../../constants/globalConstants';

export class AudioCallGame extends Component {
    constructor(props) {
        super(props);
        this.repository = props.repository;
        this.state = { selectedWord: false, round: this.getRound() };
        this.result = [];
    }

    componentDidMount() {
        this.handleSpeak();
    }

    componentDidUpdate() {
        if (!this.state.selectedWord) {
            this.handleSpeak();
        }
    }

    getRound() {
        return {
            word: this.repository.getWord(),
            gameWords: this.repository.getWordsForGame(),
            audio: this.repository.getAudio(),
        };
    }

    addResult(word, isCorrect) {
        this.result.push({ word, isCorrect });
    }

    handleSelectWord(word, isCorrect) {
        this.addResult(word, isCorrect);
        this.setState({ selectedWord: true });
        // сохранить статистику
    }

    handleSpeak() {
        this.state.round.audio.play();
    }

    handleNextWord() {
        if (!this.repository.increment()) {
            this.props.endGame(this.result);
            return;
        }

        this.setState({ selectedWord: false, round: this.getRound() });
    }

    render() {
        const { round, selectedWord } = this.state;
        return (
            <div className="audio-call">
                <span
                    className={`audio-call__word-image ${selectedWord ? 'audio-call__word-image_show' : ''}`}
                    style={{ backgroundImage: `url("${fileResource + this.state.round.word.image}")` }}
                />
                <div className={`audio-call__quest ${selectedWord ? 'audio-call__quest_show' : ''}`}>
                    <span className="audio-call__dinamic" onMouseDown={() => this.handleSpeak()} tabIndex="0" role="button"> </span>
                    <span className="audio-call__quest-word">{this.state.round.word.word}</span>
                </div>
                <WordList
                    words={round.gameWords}
                    wordId={round.word.id}
                    selected={(isCorrect) => this.handleSelectWord(round.word, isCorrect)}
                    selectCorrect={selectedWord}
                />
                {this.state.selectedWord
                    ? <button className="audio-call__button" type="button" onClick={() => this.handleNextWord()}>→→→</button>
                    : <button className="audio-call__button" type="button" onClick={() => this.handleSelectWord(round.word, false)}>don&apos;t know</button>}
            </div>
        );
    }
}

AudioCallGame.propTypes = {
    repository: PropTypes.shape({
        getWordsForGame: PropTypes.func.isRequired,
        getAudio: PropTypes.func.isRequired,
        increment: PropTypes.func.isRequired,
    }).isRequired,
    endGame: PropTypes.func.isRequired,
};

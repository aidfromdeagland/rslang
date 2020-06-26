/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WorldList } from './worldList';

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

    addResult(world, correct) {
        this.result.push({ world, correct });
    }

    handleSelectWord(world, correct) {
        this.addResult(world, correct);
        this.setState({ selectedWord: true, selectCorrect: true });
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

        this.setState({ selectedWord: false, round: this.getRound(), selectCorrect: false });
    }

    render() {
        const { round, selectCorrect } = this.state;
        return (
            <div className="audio-call">
                <span className="audio-call__dinamic" onMouseDown={() => this.handleSpeak()} tabIndex="0" role="button"> </span>
                <WorldList
                    words={round.gameWords}
                    wordId={round.word.id}
                    selected={(isCorrect) => this.handleSelectWord(round.word, isCorrect)}
                    selectCorrect={selectCorrect}
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

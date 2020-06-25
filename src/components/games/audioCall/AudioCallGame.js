/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class AudioCallGame extends Component {
    constructor(props) {
        super(props);
        this.repository = props.repository;
        this.state = { selectedWord: false, round: this.getRound() };
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

    handleSpeak() {
        this.state.round.audio.play();
    }

    handleSelectWord() {
        this.setState({ selectedWord: true });
    }

    handleNextWord() {
        if (this.repository.increment()) {
            this.getRound();
        } else {
            // конец игры
        }

        this.setState({ selectedWord: false, round: this.getRound() });
    }

    render() {
        const wordsRender = this.state.round.gameWords.map((w) => (
            <span
                className="audio-call__word"
                key={w.id}
                onMouseDown={() => this.handleSelectWord(w.id)}
                tabIndex="0"
                role="button"
            >
                {w.wordTranslate}
            </span>
        ));
        return (
            <div className="audio-call">
                <span className="audio-call__dinamic" onMouseDown={() => this.handleSpeak()} tabIndex="0" role="button"> </span>
                <div className="audio-call__words">{wordsRender}</div>
                {this.state.selectedWord
                    ? <button className="audio-call__do-not-know" type="button" onClick={() => this.handleNextWord()}>→→→</button>
                    : <button className="audio-call__do-not-know" type="button" onClick={() => this.handleNextWord()}>don&apos;t know</button>}
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
};

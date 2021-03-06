/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WordList } from './wordList';
import { MEDIA_PREFIX_URL } from '../../../constants/globalConstants';
import { Repository } from './repository';
import { MAX_COUNT_QUEST_WORDS, MODE_GAME } from './constants';
import { tryExecute, getTextWord } from './utils';
import { WordService } from '../../../services/wordServices';

export class AudioCallGame extends Component {
    constructor(props) {
        super(props);
        this.repository = new Repository(props.repositoryState);
        this.state = { selectedWord: false, pressNumber: undefined, round: this.getRound() };
        this.result = [];
    }

    componentDidMount() {
        this.setDirectionWords();
        let isPressed = false;

        this.keydown = (e) => {
            if (isPressed) {
                return;
            }
            isPressed = true;
            this.handleKeyPress(e);
        };
        this.keyup = () => { isPressed = false; };
        document.addEventListener('keydown', this.keydown);
        document.addEventListener('keyup', this.keyup);
    }

    componentDidUpdate() {
        if (this.state.selectedWord || this.state.pressNumber) {
            return;
        }
        this.handleSpeak();
        this.setDirectionWords();
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keydown);
        document.removeEventListener('keyup', this.keyup);
    }

    setDirectionWords() {
        if (this.state.isDirectionColumn) {
            return;
        }
        const isDirectionColumn = this.audioCallContainer.offsetWidth
            === this.wordListComponent.container.offsetWidth;
        if (isDirectionColumn !== this.state.isDirectionColumn) {
            this.setState({ isDirectionColumn });
        }
    }

    getRound() {
        return {
            word: this.repository.getWord(),
            gameWords: this.repository.getWordsForGame(),
            audio: this.repository.getAudio(),
            background: this.repository.getBackgroundProgress(),
        };
    }

    async addResult(word, isCorrect) {
        this.result.push({ word, isCorrect });
        if (this.props.repositoryState.currentSettings.modeGame === MODE_GAME['All words']) {
            return;
        }
        try {
            // custom add user words:
            // await WordService.postWord(word.id,
            //     WordService.createWordPost(Date.now(), Date.now(), 1));
            // await WordService.deleteWord(word.id);
            WordService.putWord(word.id, WordService.createStatisticWordPut(
                word.userWord, isCorrect,
            ));
        } catch (e) {
            this.props.errorFunction(e, undefined, 'Save statistic');
        }
    }

    handleSelectWord(word, isCorrect) {
        this.addResult(word, isCorrect);
        this.setState({ selectedWord: true });
    }

    handleSpeak() {
        this.state.round.audio.play();
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (this.state.selectedWord) {
                this.handleNextWord();
            } else {
                this.handleSelectWord(this.state.round.word, false);
            }
        } else if (e.key > 0 && e.key <= MAX_COUNT_QUEST_WORDS) {
            e.preventDefault();
            this.setState({ pressNumber: Number(e.key) });
        }
    }

    handleNextWord() {
        if (!this.repository.increment()) {
            this.props.endGame(this.result);
            return;
        }

        tryExecute(async () => {
            this.setState({
                selectedWord: false,
                pressNumber: undefined,
                round: this.getRound(),
                isDirectionColumn: false,
            });
        }, this.props.errorFunction);
    }

    render() {
        const {
            round, selectedWord, pressNumber, isDirectionColumn,
        } = this.state;
        const { modeLangGame } = this.props.repositoryState.currentSettings;
        return (
            <div className="audio-call" style={{ background: round.background }} ref={(el) => { this.audioCallContainer = el; }}>
                <span
                    className={`audio-call__word-image ${selectedWord ? 'audio-call__word-image_show' : ''}`}
                    style={{ backgroundImage: `url("${MEDIA_PREFIX_URL + this.state.round.word.image}")` }}
                />
                <div className={`audio-call__quest ${selectedWord ? 'audio-call__quest_show' : ''}`}>
                    <span className="audio-call__dinamic" onMouseDown={() => this.handleSpeak()} tabIndex="0" role="button"> </span>
                    <span className="audio-call__quest-word">{getTextWord(this.state.round.word, modeLangGame, true)}</span>
                </div>
                <WordList
                    ref={(el) => { this.wordListComponent = el; }}
                    words={round.gameWords}
                    wordId={round.word.id}
                    selected={(isCorrect) => this.handleSelectWord(round.word, isCorrect)}
                    selectCorrect={selectedWord}
                    pressNumber={pressNumber}
                    isDirectionColumn={isDirectionColumn}
                    modeLangGame={modeLangGame}
                />
                {this.state.selectedWord
                    ? <button className="audio-call__button" type="button" onClick={() => this.handleNextWord()}>→→→</button>
                    : <button className="audio-call__button" type="button" onClick={() => this.handleSelectWord(round.word, false)}>don&apos;t know</button>}
            </div>
        );
    }
}

AudioCallGame.propTypes = {
    repositoryState: PropTypes.shape({
        currentSettings: PropTypes.shape({
            group: PropTypes.number,
            page: PropTypes.number,
            modeGame: PropTypes.number,
            modeLangGame: PropTypes.number,
        }),
    }).isRequired,
    endGame: PropTypes.func.isRequired,
    errorFunction: PropTypes.func.isRequired,
};

/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import './audioCall.scss';
import { Spinner } from '../../shared/spinner';
import { WordService } from '../../../services/wordServices';
import { shuffle, randomInteger, createIncArray } from '../../../utils/utils';
import { groupCount, pageCount, fileResource } from '../../../constants/globalConstants';

export class AudioCall extends Component {
    constructor() {
        super();
        this.state = { isGame: false, group: 1, page: 10 };
        this.userWords = undefined;
        this.words = undefined;
    }
    // TODO разделить стартовый экран и игру

    componentDidMount() {
        const modeIsUserWords = false; // todo получить режим игры
        if (modeIsUserWords) {
            this.loadData();
        }
        this.setState({ modeIsUserWords });
    }

    async loadData() {
        this.userWords = shuffle(await WordService.getWords(this.state.group, this.state.page));
        this.words = [...this.userWords];
        if (!this.state.isGame && this.state.isLoading) {
            this.handleNextWord();
            this.setState({
                haveWords: true,
                isGame: true,
                isLoading: false,
                indexWord: 0,
            });
        } else {
            this.setState({ haveWords: true });
        }
    }

    handleGroupChange(event) {
        this.setState({ group: event.target.value });
    }

    handlePageChange(event) {
        this.setState({ page: event.target.value });
    }

    handleSpeak() {
        this.audio.play();
    }

    handleStartGame() {
        if (this.state.haveWords) {
            this.handleNextWord();
            this.setState({
                isGame: true,
                indexWord: 0,
            });
        } else {
            if (!this.state.modeIsUserWords) {
                this.loadData();
            }
            this.setState({
                isLoading: true,
            });
        }
    }

    handleSelectWord(wordId) {
        const { selectWordId } = this.state;
        this.setState({ selectWordId: selectWordId !== wordId ? wordId : undefined });
    }

    handleNextWord() {
        let { indexWord } = this.state;
        if (indexWord !== undefined) {
            const isCorrect = this.state.selectWordId === this.word.id;
            indexWord += 1;
        } else {
            indexWord = 0;
        }
        this.word = this.userWords[indexWord];
        this.gameWords = shuffle(this.words.filter((w) => w.id !== this.word.id)).slice(0, 4);
        this.gameWords.splice(randomInteger(3), 0, this.word);

        this.audio = new Audio(fileResource + this.word.audio);
        this.audio.play();
        this.setState({ indexWord, selectWordId: undefined });
    }

    render() {
        const getGroupSelect = () => (
            <select className="list" key="group" value={this.state.group} onChange={(e) => this.handleGroupChange(e)}>
                {createIncArray(groupCount).map((o) => <option key={o}>{o}</option>)}
            </select>
        );
        const getPageSelect = () => (
            <select className="list" key="page" value={this.state.page} onChange={(e) => this.handlePageChange(e)}>
                {createIncArray(pageCount).map((o) => <option key={o}>{o}</option>)}
            </select>
        );

        if (!this.state.isGame) {
            return (
                <div className="audio-call">
                    <h1 className="audio-call__header">Audio Call</h1>
                    {!this.state.modeIsUserWords
                        && (
                            <div>
                                { getGroupSelect() }
                                { getPageSelect() }
                            </div>
                        )}
                    <span className="audio-call__description">Select the translation of the spoken word</span>
                    <span className="audio-call__train">Improves the perception of English speech by ear</span>
                    {
                        this.state.isLoading
                            ? <Spinner />
                            : <button className="audio-call__start-game" type="button" onClick={() => this.handleStartGame()}>Start game</button>
                    }
                </div>
            );
        }
        const wordsRender = this.gameWords.map((w) => (
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
                <audio><track kind="captions" src={fileResource + this.word.audio} /></audio>
                <div className="audio-call__words">{wordsRender}</div>
                {this.state.selectWordId
                    ? <button className="audio-call__do-not-know" type="button" onClick={() => this.handleNextWord()}>→→→</button>
                    : <button className="audio-call__do-not-know" type="button" onClick={() => this.handleNextWord()}>don&apos;t know</button>}
            </div>
        );
    }
}

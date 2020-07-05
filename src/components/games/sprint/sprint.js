import React, { Component } from 'react';
import './fonts.scss';
import './sprint.scss';

import * as Constants from './constants';
import { Factor } from './factor';
import { Score } from './score';
import { Timer } from './timer';
import * as Utils from './utils';
import { WordService } from '../../../services/wordServices';
import { Wordscore } from './wordscore';
import { Words } from './words';

export class Sprint extends Component {
    constructor(props) {
        super(props);
        this.words = [];
        this.wordOrder = [];

        this.state = {
            gameOver: false,
            score: 0,
            wordScore: Constants.BEGINNING_WORD_SCORE,
            factor: 1,
            count: 0,
            wordRus: '',
            wordEng: '',
            right: false,
        };
    }

    componentDidMount() {
        document.addEventListener('keydown', (event) => this.handleKeyDown(event));
        this.getWords(0, 0);
    }

    async getWords(level, page) {
        this.words = await WordService.getWords(level, page);
        this.wordOrder = Utils.generateRandomArray(this.words.length);
        const curWord = this.getNextWord();
        this.setState({
            wordRus: curWord.wordTranslate,
            wordEng: curWord.word,
            right: curWord.right,
        });
    }

    getNextWord() {
        const word = this.words[this.wordOrder[0]].word;
        const right = Math.random() >= 0.5;
        let wordTranslate = '';
        if (right) {
            wordTranslate = this.words[this.wordOrder[0]].wordTranslate;
        } else {
            let rand = Utils.getRandom(0, this.words.length - 1);
            while (rand === this.wordOrder[0]) {
                rand = Math.ceil(Math.random() * (this.words.length - 1));
            }
            wordTranslate = this.words[rand].wordTranslate;
        }
        this.wordOrder.shift();
        return { word, wordTranslate, right };
    }

    handleSuccessClick() {
        if (this.state.right === true) {
            this.successUpdate();
        } else {
            this.failureUpdate();
        }
    }

    successUpdate() {
        const score = this.state.score + this.state.wordScore;
        let factor = this.state.factor;
        let count = this.state.count;
        let wordScore = this.state.wordScore;
        if (factor < Constants.MAX_FACTOR) {
            if (this.state.count === Constants.MAX_ATTEMPT) {
                factor += 1;
            }
            count = (count + 1) % Constants.MAX_FACTOR;
            wordScore = Constants.BEGINNING_WORD_SCORE * 2 ** (factor - 1);
        }
        const curWord = this.getNextWord();
        this.setState(
            {
                score,
                wordScore,
                factor,
                count,
                wordRus: curWord.wordTranslate,
                wordEng: curWord.word,
                right: curWord.right,
            },
        );
    }

    handleFailClick() {
        const { right } = this.state;
        if (right) {
            this.failureUpdate();
        } else {
            this.successUpdate();
        }
    }

    failureUpdate() {
        const curWord = this.getNextWord();
        this.setState({
            wordScore: Constants.BEGINNING_WORD_SCORE,
            factor: 1,
            count: 0,
            wordRus: curWord.wordTranslate,
            wordEng: curWord.word,
            right: curWord.right,
        });
    }

    stopGame() {
        this.setState({
            gameOver: true,
        });
    }

    handleKeyDown(event) {
        if (event.key === Constants.ARROW_LEFT_KEY) {
            this.handleFailClick();
        }
        if (event.key === Constants.ARROW_RIGHT_KEY) {
            this.handleSuccessClick();
        }
    }

    render() {
        const {
            score, wordScore, count, factor, wordEng, wordRus,
        } = this.state;
        return (
            <div className="sprint">
                <div className="panel">
                    <div className="words_selection">&nbsp;</div>
                    <Score score={score} />
                    <Timer stopGame={this.stopGame.bind(this)} />
                </div>
                <div className="board">
                    <Wordscore wordScore={wordScore} count={count} />
                    <Factor runners={factor} />
                    <Words wordEng={wordEng} wordRus={wordRus} />
                    <div className="yes_large">&nbsp;</div>
                    <div className="checking">
                        <button id="fail" type="button" onClick={this.handleFailClick.bind(this)}>Wrong</button>
                        <button id="success" type="button" onClick={this.handleSuccessClick.bind(this)}>Correct</button>
                    </div>
                </div>
                <div className="arrow_buttons">
                    <button id="wrong_arrow" type="button" onClick={this.handleFailClick.bind(this)}>&nbsp;</button>
                    <button id="correct_arrow" type="button" onClick={this.handleSuccessClick.bind(this)}>&nbsp;</button>
                </div>
            </div>
        );
    }
}

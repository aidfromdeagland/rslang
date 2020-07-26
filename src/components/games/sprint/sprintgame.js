/* eslint-disable */
import React, { Component } from 'react';

import * as Constants from './constants';
import { Factor } from './factor';
import { Results } from './results';
import { Score } from './score';
import { SettingService } from '../../../services/settingServices';
import soundCorrect from '../../../assets/audio/correct.mp3';
import soundError from '../../../assets/audio/error.mp3';
import { Spinner } from '../../shared/spinner';
import { StatisticService } from '../../../services/statisticServices';
import { Timer } from './timer';
import * as Utils from './utils';
import { WordService } from '../../../services/wordServices';
import { Wordscore } from './wordscore';
import { Words } from './words';

export class SprintGame extends Component {
    constructor(props) {
        super(props);
        this.words = [];
        this.wordOrder = [];
        this.handleKeyDown = this.handleKeyDown.bind(this);

        this.state = {
            isLoad: true,
            gameOver: false,
            score: 0,
            wordScore: Constants.BEGINNING_WORD_SCORE,
            factor: 1,
            count: 0,
            wordRus: '',
            wordEng: '',
            right: false,
            wrongAnswers: 0,
            correctAnswers: 0,
            results: [],
            percent: 100,
        };
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
        const { group, page } = this.props;
        this.getWords(group, page);
        const settings = {
            group,
            page,
        };
        this.saveSettingsSprint(settings);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    getAudio = (url) => {
        new Audio(Constants.AUDIO_URL + url).play();
    }

    async getWords(group, page) {
        const { mode } = this.props;
        if (mode === 'userWords') {
            const totalLearnedWordsQuery = { 'userWord.optional.isDeleted': false };
            const wordsResponse = await WordService.getUserAggWords('', totalLearnedWordsQuery, 100);
            this.words = wordsResponse[0].paginatedResults;
        } else {
            this.words = await WordService.getWordsExt(group, page, 100, 100);
        }
        this.wordOrder = Utils.generateRandomArray(this.words.length);
        const curWord = this.getNextWord();
        this.setState({
            wordRus: curWord.wordTranslate,
            wordEng: curWord.word,
            right: curWord.right,
            isLoad: false,
        });
    }

    getNextWord() {
        const { word } = this.words[this.wordOrder[0]];
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
        this.getAudio(this.words[this.wordOrder[0]].audio);
        this.wordOrder.shift();
        return { word, wordTranslate, right };
    }

    successUpdate() {
        const score = this.state.score + this.state.wordScore;
        const correctAnswers = this.state.correctAnswers + 1;
        new Audio(soundCorrect).play();
        let { factor } = this.state;
        let { count } = this.state;
        let { wordScore } = this.state;

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
                correctAnswers,
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
        const wrongAnswers = this.state.wrongAnswers + 1;
        const curWord = this.getNextWord();
        new Audio(soundError).play();
        this.setState({
            wordScore: Constants.BEGINNING_WORD_SCORE,
            factor: 1,
            count: 0,
            wordRus: curWord.wordTranslate,
            wordEng: curWord.word,
            right: curWord.right,
            wrongAnswers,
        });
    }

    stopGame() {
        document.removeEventListener('keydown', this.handleKeyDown);
        const {
            score, wrongAnswers, correctAnswers,
        } = this.state;
        const sprintStats = StatisticService.createGameStat(correctAnswers, wrongAnswers, score);
        this.saveStatisticsSprint(sprintStats);
        this.setState({
            isLoad: true,
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

    saveSettingsSprint = async (sprintSettings) => {
        const settings = await SettingService.get();
        settings.optional.sprint = JSON.stringify(sprintSettings);
        await SettingService.put(settings);
    }

    saveStatisticsSprint = async (sprintStats) => {
        const stats = await StatisticService.get();
        const statsSprintSaved = stats.optional.sprint;
        let arrayStats = [];
        if (statsSprintSaved !== undefined) {
            arrayStats = JSON.parse(statsSprintSaved);
        }
        if (arrayStats.length === 1 && arrayStats[0].Date === null) { arrayStats.pop(); }
        arrayStats.push(sprintStats);
        stats.optional.sprint = JSON.stringify(arrayStats);
        await StatisticService.put(stats);
        this.loadStatisticsSprint();
    }

    loadStatisticsSprint = async () => {
        let arr = [];
        const stats = await StatisticService.get();
        const statsSprintSaved = stats.optional.sprint;
        if (statsSprintSaved !== undefined) {
            arr = JSON.parse(statsSprintSaved);
        }

        arr = arr.sort((a, b) => b.Score - a.Score);

        const len = arr.length;
        const index = arr.findIndex((elem, idx) => elem.Score === this.state.score);
        const percent = (index + 1) * 100 / len;
        const percentRounded = Math.round(percent * 100) / 100;
        arr = arr.slice(0, 3);

        this.setState({
            results: arr,
            isLoad: false,
            percent: percentRounded,
        });
    }

    handleSuccessClick() {
        if (this.state.right === true) {
            this.successUpdate();
        } else {
            this.failureUpdate();
        }
    }

    render() {
        const {
            isLoad, gameOver, score, wordScore, count, factor, wordEng,
            wordRus, wrongAnswers, correctAnswers, results, percent,
        } = this.state;

        if (isLoad) {
            return (
                <div className="sprint">
                    <Spinner />
                    ;
                </div>
            );
        }

        if (!gameOver) {
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
        return (
            <Results
                score={score}
                wrongAnswers={wrongAnswers}
                correctAnswers={correctAnswers}
                results={results}
                percent={percent}
            />
        );
    }
}

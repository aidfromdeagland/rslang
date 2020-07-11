/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */

import React, { Component } from 'react';
import './startPage.scss';
import gal0 from '../../../assets/images/hangman/gal0.png';
import gal1 from '../../../assets/images/hangman/gal1.png';
import gal2 from '../../../assets/images/hangman/gal2.png';
import gal3 from '../../../assets/images/hangman/gal3.png';
import gal4 from '../../../assets/images/hangman/gal4.png';
import gal5 from '../../../assets/images/hangman/gal5.png';
import gal6 from '../../../assets/images/hangman/gal6.png';
// import { Dropdown } from './dropdown/dropDown';
import { WordService } from '../../../services/wordServices';
import { Spinner } from '../../shared/spinner';
import { ModalResult } from './modalResults/modalResult';
import { SettingService } from '../../../services/settingServices';
import { settingsDefault } from '../../../constants/globalConstants';
import { StatisticService } from '../../../services/statisticServices';
import { Button } from '../../shared/button';
import { ALPHABET, IMAGES_GAL } from './data';
import { Dropdown } from './dropDown/dropDown';
import { convertStatisticJson } from '../../../utils/utils';
import { getMemoInfoMiniGames } from '../../../services/spacedRepetition';
import { Checkbox } from './checkBox/checkBox';

let audio;
let audioPlay;
export class GameHangman extends Component {
    constructor(props) {
        super(props);
        this.results = {
            know: [],
            dontKnow: [],
        };
        this.state = {
            level: 1,
            page: 1,
            haveWords: false,
            correctLetters: [],
            inCorrectLetters: [],
            dataForGame: [],
            wrongCount: 0,
            showWordResult: false,
            isRightWord: null,
            isNext: true,
            isPlayingAudio: false,
            isAutoPronunciation: true,

            isGameModeTrain: true,
            isClickedCard: false,
            indexClickedCard: null,
            totalSpokenWords: 0,
            correctWords: [],
            isRoundEnd: false,
            wordCount: 0,
        };
    }

    componentDidMount() {
        const { haveWords } = this.state;
        if (!haveWords) {
            this.loadSettings();
            this.loadStatistic();
        }
    }

    componentDidUpdate() {
        const {
            haveWords,
            isNext,
            wordCount,
        } = this.state;
        if (!haveWords) {
            this.loadWords();
        }
        if (!isNext) {
            this.createDataForGame(wordCount);
        }
    }

    // componentWillUnmount() {
    //     recognition.stop();
    //     recognition.onend = () => {
    //         recognition.stop();
    //     };
    // }

    loadSettings = async () => {
        this.settings = await SettingService.get();
        const settingsForGame = this.settings.optional.hangman
            ? JSON.parse(this.settings.optional.hangman)
            : JSON.parse(settingsDefault.optional.hangman);
        this.setState({
            level: settingsForGame.group,
            page: settingsForGame.page,
        });
        this.loadWords();
    }

    putSettings = (level, page) => {
        const { optional } = this.settings;
        const gameSettings = JSON.stringify({
            group: level,
            page,
        });
        optional.hangman = gameSettings;
        const settings = SettingService.createObject(this.settings.wordsPerDay, optional);
        SettingService.put(settings);
    }

    loadStatistic = async () => {
        this.statistic = await StatisticService.get();
        this.gameStatistic = this.statistic.optional.hangman
            ? JSON.parse(this.statistic.optional.hangman)
            : [];
        console.log(this.statistic)
    }

    putStatistic = () => {
        const gameStatistic = convertStatisticJson(this.gameStatistic);
        this.statistic.optional.hangman = gameStatistic;
        StatisticService.put(this.statistic);
    }

    addStatisticsData = () => {
        const gameStatistic = StatisticService.createGameStat(this.results.know.length, this.results.dontKnow.length);
        this.gameStatistic.push(gameStatistic);
        this.putStatistic();
    }

    loadWords = async () => {
        const {
            isGameWithUserWords,
            isGameWithLevels,
        } = this.props;
        const {
            level,
            page,
        } = this.state;
        if (isGameWithLevels) {
            const calculatingPage = Math.floor((page - 1) / 2);
            const calculatingLevel = level - 1;
            this.allWords = await WordService.getWords(calculatingLevel, calculatingPage);
        }
        if (isGameWithUserWords) {
            const totalLearnedWordsQuery = { 'userWord.optional.isDeleted': false };
            const wordsResponse = await WordService.getUserAggWords('', totalLearnedWordsQuery, 3600);
            const userWords = wordsResponse[0].paginatedResults;
            this.allWords = this.getRandomData(userWords);
        }
        this.createDataForGame();
        // this.setState({ haveWords: true });
    }

    createDataForGame = () => {
        const {
            isGameWithUserWords,
            isGameWithLevels,
        } = this.props;
        const {
            page,
            wordCount,
        } = this.state;
        // let dataForGameRound;
        if (isGameWithLevels) {
            this.dataForGameRound = (page - 1) % 2 === 0
                ? this.allWords.slice(0, 10)
                : this.allWords.slice(10, 20);
        }
        if (isGameWithUserWords) {
            this.dataForGameRound = this.allWords.slice();
        }

        this.filterData = this.dataForGameRound.map((data) => ({
            word: data.word,
            wordTranslate: data.wordTranslate,
            wordAudio: data.audio,
            wordTranscription: data.transcription,
            wordId: data.id,
            wordImage: data.image,
        }));
        this.setState({
            dataForGame: this.filterData[wordCount],
            haveWords: true,
            isNext: true,
        });
    }

    getRandomData = (data) => {
        const newData = data.slice();
        const randomData = [];
        for (let i = 9; i >= 0; i -= 1) {
            const randomIndex = this.randomInteger(0, newData.length - 1);
            randomData.push(newData[randomIndex]);
            newData.splice(randomIndex, 1);
        }
        return randomData;
    }

    randomInteger = (min, max) => {
        const rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }

    addToResults = (result, word, audioUrl) => {
        this.results[result].push({ word, audioUrl });
    }

    checkBoxHandle = (prop) => {
        this.setState((prev) => ({
            [prop]: !prev[prop],
        }));
    }

    handleCheckLetter = (letter) => {
        const {
            dataForGame,
            correctLetters,
            inCorrectLetters,
            wrongCount,
            showWordResult,
            wordCount,
            isAutoPronunciation,
        } = this.state;
        const {
            isGameWithUserWords,
        } = this.props;
        const wordForGameRound = this.dataForGameRound[wordCount];
        let newCorrectLetters = correctLetters.slice();
        const newIncorrectLetters = inCorrectLetters.slice();

        if (showWordResult) {
            return;
        }

        if (newCorrectLetters.includes(letter.toLowerCase())
            || newCorrectLetters.includes(letter.toUpperCase())
            || newIncorrectLetters.includes(letter.toLowerCase())
            || newIncorrectLetters.includes(letter.toUpperCase())) {
            return;
        }

        if (dataForGame.word.split('').includes(letter.toLowerCase()) || dataForGame.word.split('').includes(letter.toUpperCase())) {
            const allLetters = dataForGame.word.split('').filter((lett) => lett.toLowerCase() === letter.toLowerCase());
            newCorrectLetters = newCorrectLetters.concat(allLetters);
        } else {
            newIncorrectLetters.push(letter);
            this.setState({
                wrongCount: wrongCount + 1,
            });
        }

        if (newIncorrectLetters.length === 6) {
            if (isGameWithUserWords) {
                const result = getMemoInfoMiniGames(false, wordForGameRound.userWord.optional.repeats, wordForGameRound.userWord.optional.nextDate);
                const wordPut = { ...wordForGameRound };
                wordPut.userWord.optional.repeats = result.repetitions;
                wordPut.userWord.optional.prevDate = result.prevRepetitionDate;
                wordPut.userWord.optional.nextDate = result.nextRepetitionDate;
                WordService.putWord(wordPut.id, { optional: wordPut.userWord.optional });
            }
            this.setState({ isRightWord: false });
            const urlAudio = `https://raw.githubusercontent.com/aidfromdeagland/rslang-data/master/${dataForGame.wordAudio}`;
            if (isAutoPronunciation) {
                this.handlePlayAudio(urlAudio);
            }
            this.addToResults('dontKnow', dataForGame.word, urlAudio);
            this.gameOverHandler();
        }

        if (newCorrectLetters.length === dataForGame.word.split('').length) {
            if (isGameWithUserWords) {
                const result = getMemoInfoMiniGames(true, wordForGameRound.userWord.optional.repeats, wordForGameRound.userWord.optional.nextDate);
                const wordPut = { ...wordForGameRound };
                wordPut.userWord.optional.repeats = result.repetitions;
                wordPut.userWord.optional.prevDate = result.prevRepetitionDate;
                wordPut.userWord.optional.nextDate = result.nextRepetitionDate;
                WordService.putWord(wordPut.id, { optional: wordPut.userWord.optional });
            }
            this.setState({ isRightWord: true });
            const urlAudio = `https://raw.githubusercontent.com/aidfromdeagland/rslang-data/master/${dataForGame.wordAudio}`;
            if (isAutoPronunciation) {
                this.handlePlayAudio(urlAudio);
            }
            this.addToResults('know', dataForGame.word, urlAudio);
            this.gameOverHandler();
        }

        this.setState({
            correctLetters: newCorrectLetters,
            inCorrectLetters: newIncorrectLetters,
        });
    }

    gameOverHandler = () => {
        this.setState({ showWordResult: true });
    }

    handleContinue = () => {
        const { wordCount } = this.state;
        if (wordCount < 9) {
            this.getNextWord(wordCount + 1);
        }
        if (wordCount === 9) {
            this.showResults();
        }
    }

    getNextWord = (count) => {
        this.setState({
            wordCount: count,
            showWordResult: false,
            correctLetters: [],
            inCorrectLetters: [],
            isNext: false,
            wrongCount: 0,
            isRightWord: null,
        });
    }

    showResults = () => {
        const { level, page } = this.state;
        this.setState({ isRoundEnd: true });
        this.addStatisticsData();
        if (level === 6 && page === 60) {
            this.putSettings(1, 1);
        }
        if (page < 60) {
            this.putSettings(level, parseFloat(page) + 1);
        } else {
            this.putSettings(level + 1, 1);
        }
    }

    selectLevel = (level, page) => {
        const {
            isGameWithUserWords,
            isGameWithLevels,
        } = this.props;
        if (isGameWithLevels) {
            this.setState({
                level,
                page,
                haveWords: false,
                wordCount: 0,
                showWordResult: false,
                correctLetters: [],
                inCorrectLetters: [],
                isNext: false,
                wrongCount: 0,
                isRightWord: null,
            });
        }
        if (isGameWithUserWords) {
            this.setState(() => ({
                wordCount: 0,
                haveWords: false,
                showWordResult: false,
                correctLetters: [],
                inCorrectLetters: [],
                isNext: false,
                wrongCount: 0,
                isRightWord: null,
            }));
        }
        this.results.know = [];
        this.results.dontKnow = [];
        this.putSettings(level, page);
    }

    handleByNextRound = () => {
        const {
            level,
            page,
        } = this.state;
        this.setState({ isRoundEnd: false });
        if (level === 6 && page === 60) {
            this.selectLevel(1, 1);
        }
        if (page < 60) {
            this.selectLevel(level, parseFloat(page) + 1);
        } else {
            this.selectLevel(level + 1, 1);
        }
        this.results.know = [];
        this.results.dontKnow = [];
    }

    handleDontKnow = () => {
        const {
            dataForGame,
            isAutoPronunciation,
        } = this.state;
        this.setState({
            wrongCount: 6,
            showWordResult: true,
            isRightWord: false,
            correctLetters: [],
            inCorrectLetters: [],
        });
        const urlAudio = `https://raw.githubusercontent.com/aidfromdeagland/rslang-data/master/${dataForGame.wordAudio}`;
        this.addToResults('dontKnow', dataForGame.word, urlAudio);
        if (isAutoPronunciation) {
            this.handlePlayAudio(urlAudio);
        }
    }

    handlePlayAudio = (url) => {
        if (audioPlay) {
            audioPlay.then(() => {
                audio.pause();
                audio = new Audio(url);
                audioPlay = audio.play();
                audio.onplaying = () => {
                    this.setState({ isPlayingAudio: true });
                };
                audio.onended = () => {
                    this.setState({ isPlayingAudio: false });
                };
                audio.onpause = () => {
                    this.setState({ isPlayingAudio: false });
                };
            });
        } else {
            audio = new Audio(url);
            audioPlay = audio.play();
            audio.onplaying = () => {
                this.setState({ isPlayingAudio: true });
            };
            audio.onended = () => {
                this.setState({ isPlayingAudio: false });
            };
            audio.onpause = () => {
                this.setState({ isPlayingAudio: false });
            };
        }
    }

    render() {
        const {
            haveWords,
            dataForGame,
            correctLetters,
            inCorrectLetters,
            wrongCount,
            showWordResult,
            isRightWord,
            wordCount,
            isRoundEnd,
            level,
            page,
            isPlayingAudio,
            isAutoPronunciation,
        } = this.state;
        const {
            isGameWithLevels,
        } = this.props;
        if (haveWords) {
            return (
                <div className="hangman-container">
                    {(() => {
                        if (isRoundEnd) {
                            return (
                                <ModalResult
                                    results={this.results}
                                    handleByNextRound={this.handleByNextRound}
                                />
                            );
                        }
                        return null;
                    })()}
                    <div className="hangman_header">
                        {isGameWithLevels && (
                            <Dropdown
                                selectLevel={this.selectLevel}
                                level={level}
                                page={page}
                            />
                        )}
                        <Checkbox
                            text="Auto pronunciation"
                            checked={isAutoPronunciation}
                            onChange={() => this.checkBoxHandle('isAutoPronunciation')}
                        />
                    </div>
                    <div className="hangman-content">
                        <span className="word-task">{dataForGame.wordTranslate}</span>
                        <div className="main-image-container">
                            <img src={IMAGES_GAL[wrongCount]} alt="some" />
                        </div>
                        <div className="game-word">
                            {dataForGame.word.split('').map((letter, index) => {
                                if (correctLetters.includes(letter.toLowerCase())
                                    || correctLetters.includes(letter.toUpperCase())) {
                                    return (
                                        <span
                                            key={index}
                                        >
                                            {letter.toUpperCase()}
                                        </span>
                                    );
                                }
                                return (<span key={index}>&nbsp;</span>);
                            })}
                        </div>
                        {!showWordResult && <div className="game-hint">Choose the letter</div>}

                        {
                            (() => {
                                if (showWordResult) {
                                    return (
                                        <div className={isRightWord ? 'game-over game-over-correct' : 'game-over game-over-incorrect'}>
                                            <span
                                                className={isRightWord ? 'game-over_result correct-result' : 'game-over_result incorrect-result'}
                                            >
                                                {isRightWord ? 'Correct' : 'Sorry, you lost.'}
                                            </span>
                                            Correct word:
                                            <span
                                                className="correct-word"
                                            >
                                                {dataForGame.word}
                                            </span>
                                            <Button
                                                className="button"
                                                title="Continue"
                                                onClick={() => this.handleContinue(wordCount)}
                                            />
                                        </div>
                                    );
                                }
                                return null;
                            })()
                        }

                        <div className="keypad-container">
                            {ALPHABET.map((letter, index) => {
                                return (
                                    <span
                                        role="button"
                                        key={index}
                                        tabIndex={0}
                                        className={
                                            (() => {
                                                if (correctLetters.includes(letter.toLowerCase())
                                                    || correctLetters.includes(letter.toUpperCase())) {
                                                    return 'knob knob-letter knob-right';
                                                }
                                                if (inCorrectLetters.includes(letter.toLowerCase())
                                                    || inCorrectLetters.includes(letter.toUpperCase())) {
                                                    return 'knob knob-letter knob-wrong';
                                                }
                                                return 'knob knob-letter';
                                            })()

                                        }
                                        onClick={() => this.handleCheckLetter(letter)}
                                    >
                                        {letter}
                                    </span>
                                );
                            })}
                        </div>
                        <div className="progress-bar-game">
                            <div className="progress-percent-game" style={{ width: `${(wordCount + 1) * 10}%` }} />
                        </div>
                        <div className="buttons-block">
                            {!showWordResult && (
                                <Button
                                    className="button"
                                    title="Don't know"
                                    onClick={this.handleDontKnow}
                                />
                            )}
                            <Button
                                className={isPlayingAudio ? 'dynamic-btn playing' : 'dynamic-btn'}
                                onClick={() => this.handlePlayAudio(`https://raw.githubusercontent.com/aidfromdeagland/rslang-data/master/${dataForGame.wordAudio}`)}
                            />
                        </div>

                    </div>
                </div>
            );
        }
        return <Spinner />;
    }
}

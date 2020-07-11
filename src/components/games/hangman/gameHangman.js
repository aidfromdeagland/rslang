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
// import { ModalResult } from './modalResult/modalResult';
import { SettingService } from '../../../services/settingServices';
import { settingsDefault } from '../../../constants/globalConstants';
import { StatisticService } from '../../../services/statisticServices';
import { Button } from '../../shared/button';
import { ALPHABET, IMAGES_GAL } from './data';
import { Dropdown } from './dropDown/dropDown';

export class GameHangman extends Component {
    constructor(props) {
        super(props);
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
        const { haveWords, isNext, wordCount } = this.state;
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
        const settingsForGame = this.settings.optional.speakit
            ? JSON.parse(this.settings.optional.speakit)
            : JSON.parse(settingsDefault.optional.speakit);
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
        optional.speakit = gameSettings;
        const settings = SettingService.createObject(this.settings.wordsPerDay, optional);
        SettingService.put(settings);
    }

    loadStatistic = async () => {
        this.statistic = await StatisticService.get();
        this.gameStatistic = this.statistic.optional.speakit
            ? JSON.parse(this.statistic.optional.speakit)
            : [];
    }

    putStatistic = () => {
        const gameStatistic = JSON.stringify(this.gameStatistic);
        this.statistic.optional.speakit = gameStatistic;
        StatisticService.put(this.statistic);
    }

    addStatisticsData = (level, page) => {
        const {
            totalSpokenWords,
            correctWords,
        } = this.state;
        const date = new Date();
        const timeStamp = date.getTime();
        const statisticsField = {
            date: timeStamp,
            group: level,
            page,
            incorrect: totalSpokenWords - correctWords.length,
            correct: correctWords.length,
        };
        this.gameStatistic.push(statisticsField);
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
        console.log(this.filterData, wordCount)
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

    handleCheckLetter = (letter) => {
        const {
            dataForGame,
            correctLetters,
            inCorrectLetters,
            wrongCount,
            showWordResult,
        } = this.state;
        const newCorrectLetters = correctLetters.slice();
        const newIncorrectLetters = inCorrectLetters.slice();
        console.log(letter)
        if (showWordResult) {
            return null;
        }
        if (dataForGame.word.split('').includes(letter.toLowerCase()) || dataForGame.word.split('').includes(letter.toUpperCase())) {
            const allLetters = dataForGame.word.split('').filter((lett) => lett.toLowerCase() === letter.toLowerCase());
            console.log(allLetters)
            newCorrectLetters.concat(allLetters);
        } else {
            newIncorrectLetters.push(letter);
            this.setState({
                wrongCount: wrongCount + 1,
            });
        }

        if (newIncorrectLetters.length === 6) {
            this.setState({ isRightWord: false });
            this.gameOverHandler();
        }
        console.log(correctLetters, dataForGame)

        if (newCorrectLetters.length === dataForGame.word.split('').length) {
            this.setState({ isRightWord: true });
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

    getNextWord = (count) => {
        this.setState({
            wordCount: count + 1,
            showWordResult: false,
            correctLetters: [],
            inCorrectLetters: [],
            isNext: false,
            wrongCount: 0,
            isRightWord: null,
        });
        console.log(this.state.wordCount)
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
            //     indexClickedCard,
            //     isClickedCard,
            //     activeAudioUrl,
            //     activeImageUrl,
            //     activeTranslate,
            //     correctWords,
            //     totalSpokenWords,
            //     isRoundEnd,
            level,
            page,
            //     isGameModeTrain,
            //     speakWord,
        } = this.state;
        // const {
        //     isGameWithLevels,
        // } = this.props;
        // if (haveWords) {
        // console.log(correctLetters, dataForGame)
        if (haveWords) {
            return (
                <div className="hangman-container">
                    <div className="hangman_header">
                        <Dropdown
                            level={level}
                            page={page}
                        />
                    </div>
                    <div className="hangman-content">
                        <span className="word-task">{dataForGame.wordTranslate}</span>
                        <div className="main-image-container">
                            <img src={IMAGES_GAL[wrongCount]} />
                        </div>
                        <div className="game-word">
                            {dataForGame.word.split('').map((letter, index) => {
                                if (correctLetters.includes(letter.toLowerCase()) || correctLetters.includes(letter.toUpperCase())) {
                                    return (<span>{letter.toUpperCase()}</span>);
                                }
                                return (<span>&nbsp;</span>);
                            })}
                            {/* <span>&nbsp;</span>
                        <span>&nbsp;</span>
                        <span>&nbsp;</span> */}
                        </div>
                        <div className="game-hint">Choose the letter</div>

                        {
                            (() => {
                                if (showWordResult) {
                                    return (
                                        <div className="game-over">
                                            <span className="game-over_result">{isRightWord ? 'Win' : 'Sorry, you lost.'}</span>
                                            <br />
                                            Correct word: <span>{dataForGame.word}</span>
                                            <Button
                                                title="Continue"
                                                onClick={() => this.getNextWord(wordCount)}
                                            />
                                        </div>
                                    );
                                }
                                return null;
                            })()
                        }

                        <div className="keypad-container">
                            {ALPHABET.map((letter) => {
                                return (
                                    <span
                                        // className="knob knob-letter"
                                        className={
                                            (() => {
                                                if (correctLetters.includes(letter.toLowerCase()) || correctLetters.includes(letter.toUpperCase())) {
                                                    return 'knob knob-letter knob-right';
                                                }
                                                if (inCorrectLetters.includes(letter.toLowerCase()) || inCorrectLetters.includes(letter.toUpperCase())) {
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
                    </div>
                </div>
            );
        }
        return <Spinner />;

        // }
        // return <Spinner />;
    }
}

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { WordService } from '../../../services/wordServices';
import { SavannahCards } from './savannah-cards';
import { SavannahLives } from './savannah-lives';
import { SavannahWord } from './savannah-word';
import { SavannahImage } from './savannah-image';
import { SavannahStatistics } from './savannah-statistics';
import { AUDIO_URL } from '../../../constants/globalConstants';
import soundCorrect from '../../../assets/audio/correct.mp3';
import soundError from '../../../assets/audio/error.mp3';
import { SettingService } from '../../../services/settingServices';
import { StatisticService } from '../../../services/statisticServices';

import './savannah.scss';

export class SavannahGame extends Component {
    constructor(props) {
        super(props);
        this.statisticsData = [];
        this.state = {
            word: {},
            translateWords: [],
            lives: 5,
            rightAnswers: [],
            wrongAnswers: [],
            wordClass: 'savannah__card-transition',
            imageWidth: 30,
            imageHeight: 30,
            keyPressed: null,
            isCorrect: null,
            isWrong: null,
            wordInx: 0,
            allRightWords: 0,
            allWrongWords: 0,
            isLoad: true,
        };
    }

    componentDidMount() {
        this.getNewCards();
        this.startTimer();
        this.loadStatistic();

        let isPressed = false;
        this.keydown = (e) => {
            if (isPressed) {
                return;
            }
            isPressed = true;
            this.pressKey(e);
            this.handleClickByKeyboard();
        };
        this.keyup = () => { isPressed = false; };

        document.addEventListener('keydown', this.keydown);
        document.addEventListener('keyup', this.keyup);
        this.saveSettings();
    }

    componentDidUpdate() {
        if (this.state.lives < 1) {
            this.stopTimer();
        }
    }

    componentWillUnmount() {
        this.stopTimer();
        document.removeEventListener('keydown', this.keydown);
        document.removeEventListener('keyup', this.keyup);
    }

       saveSettingsSavannah = async (savannahSettings) => {
           const settings = await SettingService.get();
           settings.optional.savannah = JSON.stringify(savannahSettings);
           await SettingService.put(settings);
       }

    saveSettings = () => {
        const { group, page } = this.props;
        const settings = {
            group,
            page,
        };

        this.saveSettingsSavannah(settings);
    };

    loadStatistic = async () => {
        this.statistic = await StatisticService.get();
        this.gameStatistic = this.statistic.optional.savannah
            ? JSON.parse(this.statistic.optional.savannah)
            : [];
    }

    saveStatisticsSavannah = async () => {
        const gameStatistic = JSON.stringify(this.gameStatistic);
        this.statistic.optional.savannah = gameStatistic;
        StatisticService.put(this.statistic);
    }

    saveDataToStatistics = async () => {
        const { allRightWords, allWrongWords } = this.state;
        this.gameStatistic = this.statistic.optional.savannah
            ? JSON.parse(this.statistic.optional.savannah)
            : this.statisticsData;
        const statisticsData = await StatisticService.createGameStat(allRightWords, allWrongWords);
        this.gameStatistic.push(statisticsData);
        this.saveStatisticsSavannah();
    };

    handleClickByKeyboard =() => {
        if (this.state.isLoad && this.state.lives !== 0) {
            const { translateWords, word, keyPressed } = this.state;
            for (let i = 0; i < translateWords.length; i += 1) {
                if (translateWords[i].id === word.id) {
                    if (keyPressed === i + 1) {
                        this.stopTimer();
                        this.getRightAnswer();
                        this.showRightCard(i);
                        this.startTimer();
                    } else if (keyPressed !== i + 1 && keyPressed !== null) {
                        this.stopTimer();
                        this.getWrongAnswer();
                        this.showRightCard(i);
                        this.showWrongCard(keyPressed - 1);
                        this.startTimer();
                    }
                }
            }
        }
    }

    showRightWordByClick = () => {
        if (this.state.isLoad) {
            const { translateWords, word } = this.state;
            for (let i = 0; i < translateWords.length; i += 1) {
                if (translateWords[i].id === word.id) {
                    this.showRightCard(i);
                }
            }
        }
    };

    getAudio = (url) => {
        new Audio(AUDIO_URL + url).play();
    }

    getWord = async () => {
        const { group, page } = this.props;
        const data = await WordService.getWords(group, page);
        return data;
    }

    getUserWords = async () => {
        const totalLearnedWordsQuery = { 'userWord.optional.isDeleted': false };
        const data = await WordService.getUserAggWords('', totalLearnedWordsQuery, 3600);
        return data[0].paginatedResults;
    }

    getWrongWords = async () => {
        const { group } = this.props;
        const data = await WordService.getUserAggWords(group, '', 70);
        return data[0].paginatedResults;
    }

    getRightAnswer = () => {
        this.getNextPage();
        const {
            imageHeight, imageWidth, word, rightAnswers, wordInx, allRightWords, isLoad,
        } = this.state;
        this.getNewCards();
        const row = {
            word: word.word,
            transcription: word.transcription,
            translate: word.translate,
            audio: word.audio,
        };
        this.setState({
            rightAnswers: [...rightAnswers, row],
            wordClass: 'savannah__card-transition',
            imageHeight: imageHeight + 10,
            imageWidth: imageWidth + 10,
            wordInx: wordInx + 1,
            allRightWords: allRightWords + 1,
            isLoad: false,
        });
        new Audio(soundCorrect).play();
    }

    getNextPage = () => {
        const { page, group, getNextPage } = this.props;
        const { wordInx } = this.state;
        if (wordInx === 19 && page <= 29) {
            getNextPage((page + 1), group);
            this.setState({
                wordInx: 0,
            });
        }
        if (wordInx === 19 && page === 29 && group < 5) {
            getNextPage(0, (group + 1));
            this.setState({
                wordInx: 0,
            });
        }
        if (wordInx === 19 && page === 29 && group === 5) {
            getNextPage(0, group);
            this.setState({
                wordInx: 0,
            });
        }
        this.saveSettings();
    }

    getWrongAnswer = () => {
        this.getNextPage();
        const {
            word, wrongAnswers, allWrongWords,
        } = this.state;
        this.getNewCards();
        const row = {
            word: word.word,
            transcription: word.transcription,
            translate: word.translate,
            audio: word.audio,
        };
        this.setState({
            wordClass: 'savannah__card-transition',
            lives: this.state.lives - 1,
            wrongAnswers: [...wrongAnswers, row],
            allWrongWords: allWrongWords + 1,
            isLoad: false,
        });
        new Audio(soundError).play();
    }

    showRightCard = (card) => {
        this.setState({ isCorrect: card });
        setTimeout(() => { this.setState({ isCorrect: null }); }, 800);
    }

    showWrongCard = (card) => {
        this.setState({ isWrong: card });
        setTimeout(() => { this.setState({ isWrong: null }); }, 800);
    }

    getClassName = (i) => {
        const { isCorrect, isWrong } = this.state;
        if (i === isCorrect) {
            return 'savannah__cards-card savannah__cards-card-success';
        }
        if (i === isWrong) {
            return 'savannah__cards-card savannah__cards-card-error';
        }
        return 'savannah__cards-card';
    }

    getRandomIndex = () => Math.floor(Math.random() * (69 - 0)) + 0;

    getNewCards = async () => {
        const { wordInx } = this.state;
        const { mode } = this.props;
        const userWord = await this.getUserWords();
        const rightWord = mode === 'userWords' && userWord.length > 30 ? userWord : await this.getWord();
        const wrongWords = await this.getWrongWords();

        const arrayOfWords = [
            {
                translate: rightWord[wordInx].wordTranslate,
                id: rightWord[wordInx].id,
            },
            {
                translate: wrongWords[this.getRandomIndex()].wordTranslate,
                id: wrongWords[this.getRandomIndex()].id,

            },
            {
                translate: wrongWords[this.getRandomIndex()].wordTranslate,
                id: wrongWords[this.getRandomIndex()].id,
            },
            {
                translate: wrongWords[this.getRandomIndex()].wordTranslate,
                id: wrongWords[this.getRandomIndex()].id,
            },
        ];

        Promise.all([rightWord, wrongWords]).then(
            this.setState({
                word: {
                    id: rightWord[wordInx].id,
                    word: rightWord[wordInx].word,
                    translate: rightWord[wordInx].wordTranslate,
                    transcription: rightWord[wordInx].transcription,
                    audio: rightWord[wordInx].audio,
                },

                translateWords: arrayOfWords.sort(() => 0.5 - Math.random()),
                wordClass: 'savannah__card-transition card-bottom',
                wordInx: wordInx + 1,
                isLoad: true,

            }),

        );
    }

    pressKey = (e) => {
        if (e.key > 0 && e.key <= 4) {
            e.preventDefault();
            this.setState({
                keyPressed: Number(e.key),
            });
        } else {
            this.setState({
                keyPressed: null,
            });
        }
    }

    startTimer = () => {
        this.timer = setInterval(() => {
            this.getWrongAnswer();
        }, 7000);
    }

    stopTimer= () => {
        clearInterval(this.timer);
    }

    render() {
        const {
            word, translateWords, lives, id, wordClass, imageHeight, imageWidth,
            rightAnswers, wrongAnswers, isLoad,
        } = this.state;

        if (this.state.lives < 1) {
            return (
                <SavannahStatistics
                    rightAnswers={rightAnswers}
                    wrongAnswers={wrongAnswers}
                    getAudio={this.getAudio}
                    saveDataToStatistics={this.saveDataToStatistics}
                />
            );
        }

        return (
            <div className="savannah">
                {this.state.lives >= 1
                   && (
                       <div className="savannah__header">
                           <div className="savannah__header-btnClose">
                               <NavLink to="/mini-games">
                                   &#10006;
                               </NavLink>
                           </div>
                           <SavannahLives
                               lives={lives}
                           />
                       </div>

                   )}

                {{ word } && this.state.lives >= 1
                    && (
                        <SavannahWord
                            word={word}
                            id={id}
                            wordClass={wordClass}
                        />
                    )}

                {{ word } && this.state.lives >= 1
                    && (
                        <SavannahCards
                            translateWords={translateWords}
                            word={word}
                            getRightAnswer={this.getRightAnswer}
                            getWrongAnswer={this.getWrongAnswer}
                            stopTimer={this.stopTimer}
                            startTimer={this.startTimer}
                            getClassName={this.getClassName}
                            showRightCard={this.showRightCard}
                            showWrongCard={this.showWrongCard}
                            showRightWordByClick={this.showRightWordByClick}
                            isLoad={isLoad}
                        />
                    )}

                {this.state.lives >= 1
                   && (
                       <SavannahImage
                           imageWidth={imageWidth}
                           imageHeight={imageHeight}
                       />
                   )}
            </div>
        );
    }
}

SavannahGame.propTypes = {
    mode: PropTypes.string.isRequired,
    group: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    getNextPage: PropTypes.func.isRequired,
};

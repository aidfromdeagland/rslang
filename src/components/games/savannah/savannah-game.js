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
import './savannah.scss';

export class SavannahGame extends Component {
    constructor(props) {
        super(props);
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
        };
    }

    componentDidMount() {
        this.getNewCards();
        this.startTimer();

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

    getDataToStatistics = () => {
        const { allRightWords, allWrongWords } = this.state;
        const savannahData = {
            rightWords: allRightWords,
            wrongWords: allWrongWords,
        };
        return savannahData;
    }

    handleClickByKeyboard =() => {
        const { translateWords, word, keyPressed } = this.state;
        this.stopTimer();
        for (let i = 0; i < translateWords.length; i += 1) {
            if (translateWords[i].id === word.id) {
                if (keyPressed === i + 1) {
                    this.getRightAnswer();
                    this.showRightCard(i);
                } else if (keyPressed !== i + 1 && keyPressed !== null) {
                    this.getWrongAnswer();
                    this.showRightCard(i);
                    this.showWrongCard(keyPressed - 1);
                }
            }
        }
        this.startTimer();
    }

    showRightWordByClick = () => {
        const { translateWords, word } = this.state;
        for (let i = 0; i < translateWords.length; i += 1) {
            if (translateWords[i].id === word.id) {
                this.showRightCard(i);
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

    getWrongWords = async () => {
        const { group } = this.props;
        const data = await WordService.getUserAggWords(group, '', 100);
        return data[0].paginatedResults;
    }

    getRightAnswer = () => {
        this.getNextPage();
        const {
            imageHeight, imageWidth, word, rightAnswers, wordInx, allRightWords,
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
        });
        new Audio(soundCorrect).play();
    }

    getNextPage = () => {
        const { page, getNextPage } = this.props;
        const { wordInx } = this.state;
        if (wordInx > 19) {
            getNextPage(page + 1);
            this.setState({
                wordInx: 0,
            });
        }
    }

    getWrongAnswer = () => {
        this.getNextPage();
        const { word, wrongAnswers, allWrongWords } = this.state;
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
        });
        new Audio(soundError).play();
    }

    showRightCard = (card) => {
        this.setState({ isCorrect: card });
        setTimeout(() => { this.setState({ isCorrect: null }); }, 700);
    }

    showWrongCard = (card) => {
        this.setState({ isWrong: card });
        setTimeout(() => { this.setState({ isWrong: null }); }, 700);
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

    getRandomIndex = () => Math.floor(Math.random() * (99 - 0)) + 0;

    getNewCards = async () => {
        const { wordInx } = this.state;
        const { mode } = this.props;
        const userWord = await WordService.getUserWords();
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
            rightAnswers, wrongAnswers,
        } = this.state;

        if (this.state.lives < 1) {
            return (
                <SavannahStatistics
                    rightAnswers={rightAnswers}
                    wrongAnswers={wrongAnswers}
                    getAudio={this.getAudio}
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
    group: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    mode: PropTypes.string.isRequired,
    getNextPage: PropTypes.func.isRequired,
};

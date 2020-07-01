import React, { Component } from 'react';
import { WordService } from '../../../services/wordServices';
import { SavannahCards } from './savannahCards';
import { SavannahLives } from './savannahLives';
import { SavannahWord } from './savannahWord';
import { SavannahImage } from './savannahImage';
import { SavannahStatistics } from './savannahStatistics';
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
            selected: null,
            keyPressed: null,

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
        document.removeEventListener('keydown', this.keydown);
        document.removeEventListener('keyup', this.keyup);
    }

    handleClickByKeyboard =() => {
        const { translateWords, word, keyPressed } = this.state;
        this.stopTimer();
        for (let i = 0; i < translateWords.length; i += 1) {
            if (translateWords[i].id === word.id) {
                if (keyPressed === i + 1) {
                    this.getRightAnswer();
                } else if (keyPressed !== i + 1 && keyPressed !== null) {
                    this.getWrongAnswer();
                }
            }
        }
        this.startTimer();
    }

    getAudio = (url) => {
        new Audio(AUDIO_URL + url).play();
    }

     getWord = async () => {
         const group = Math.floor(Math.random() * (5 - 0)) + 0;
         const page = Math.floor(Math.random() * (29 - 0)) + 0;
         const data = await WordService.getWords(group, page);
         return data;
     }

    getRightAnswer = () => {
        const {
            imageHeight, imageWidth, word, rightAnswers,
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
        });
        new Audio(soundCorrect).play();
    }

    getWrongAnswer = () => {
        const { word, wrongAnswers } = this.state;
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
        });
        new Audio(soundError).play();
    }

    toggleSelected = (id) => { this.setState({ selected: id }); }

    getNewCards = async () => {
        const wordInx = Math.floor(Math.random() * (19 - 0)) + 0;
        const rightWord = await this.getWord();
        const wrongWord1 = await this.getWord();
        const wrongWord2 = await this.getWord();
        const wrongWord3 = await this.getWord();
        const arrayOfWords = [
            {
                translate: rightWord[wordInx].wordTranslate,
                id: rightWord[wordInx].id,
            },
            {
                translate: wrongWord1[wordInx].wordTranslate,
                id: wrongWord1[wordInx].id,

            },
            {
                translate: wrongWord2[wordInx].wordTranslate,
                id: wrongWord2[wordInx].id,
            },
            {
                translate: wrongWord3[wordInx].wordTranslate,
                id: wrongWord3[wordInx].id,
            },
        ];

        Promise.all([rightWord, wrongWord1, wrongWord2, wrongWord3]).then(

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
            word, translateWords, lives, id, wordClass, imageHeight, imageWidth, rightAnswers,
            wrongAnswers, selected, keyPressed,
        } = this.state;

        return (
            <div className="savannah">

                <SavannahLives
                    lives={lives}
                />

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
                            id={id}
                            lives={lives}
                            rightAnswers={rightAnswers}
                            wrongAnswers={wrongAnswers}
                            getRightAnswer={this.getRightAnswer}
                            getWrongAnswer={this.getWrongAnswer}
                            stopTimer={this.stopTimer}
                            startTimer={this.startTimer}
                            toggleSelected={this.toggleSelected}
                            selected={selected}
                            keyPressed={keyPressed}
                            getWordKey={this.getWordKey}
                        />
                    )}

                {this.state.lives < 1
                   && (
                       <SavannahStatistics
                           rightAnswers={rightAnswers}
                           wrongAnswers={wrongAnswers}
                           getAudio={this.getAudio}
                       />
                   )}

                <SavannahImage
                    imageWidth={imageWidth}
                    imageHeight={imageHeight}
                />

            </div>
        );
    }
}

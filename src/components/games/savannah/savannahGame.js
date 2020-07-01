import React, { Component } from 'react';
import { WordService } from '../../../services/wordServices';
import { SavannahCards } from './savannahCards';
import { SavannahLives } from './savannahLives';
import { SavannahWord } from './savannahWord';
import { SavannahImage } from './savannahImage';
import { SavannahStatistics } from './savannahStatistics';
import { AUDIO_URL } from '../../../constants/globalConstants';
import { soundCorrect } from '../../../assets/audio/correct.mp3';
import { soundError } from '../../../assets/audio/error.mp3';
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
        };
    }

    componentDidMount() {
        this.getNewCards();
        this.startTimer();
    }

    componentDidUpdate() {
        if (this.state.lives < 1) {
            this.stopTimer();
        }
    }

    getAudio = (url) => {
        new Audio(AUDIO_URL + url).play();
    }

     getWord = async () => {
         const group = Math.floor(Math.random() * (5 - 0)) + 0;
         const page = Math.floor(Math.random() * (29 - 0)) + 0;
         const data = await WordService.getWords(group, page);
         // console.log(data[0]);
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
                translate: wrongWord2[wordInx].wordTranslate,
                id: wrongWord2[wordInx].id,

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

    startTimer = () => {
        this.timer = setInterval(() => {
            this.getWrongAnswer();
            console.log('timer');
        }, 7000);
    }

    stopTimer= () => {
        clearInterval(this.timer);
    }

    render() {
        const {
            word, translateWords, lives, id, wordClass, imageHeight, imageWidth, rightAnswers,
            wrongAnswers, stopTimer, startTimer, selected,
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

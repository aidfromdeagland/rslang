import React, { Component } from 'react';
import './savannah.scss';
import { SavannahCards } from './savannahCards';
import { SavannahLives } from './savannahLives';
import { SavannahWord } from './savannahWord';
import { SavannahImage } from './savannahImage';

export class SavannahGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            word: null,
            translateWords: [],
            lives: 5,
            wordClass: 'savannah__card-transition',
            imageWidth: 50,
            imageHeight: 50,
        };

        this.getWord = this.getWord.bind(this);
        this.startGame = this.startGame.bind(this);
        this.lostLive = this.lostLive.bind(this);
        this.getNextWord = this.getNextWord.bind(this);
        this.resizeImage = this.resizeImage.bind(this);
        this.timeIsOver = this.timeIsOver.bind(this);
    }

    componentWillMount() {
        this.startGame();
        this.setState({
            wordClass: 'savannah__card-transition',
        });
        this.timeIsOver();
    }

    // setTimeout(() => {
    //     console.log('gogogogo');
    // }, 5000);

    async getWord() {
        const group = Math.floor(Math.random() * (5 - 0)) + 0;
        const page = Math.floor(Math.random() * (29 - 0)) + 0;
        const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    getNextWord() {
        this.startGame();
        this.setState({
            wordClass: 'savannah__card-transition',
        });
    }

    lostLive() {
        this.setState({
            lives: this.state.lives - 1,
        });
    }

    timeIsOver() {
        setTimeout(() => {
            console.log('time is over');
            this.lostLive();
            this.getNextWord();
        }, 5000);
    }

    resizeImage() {
        this.setState({
            imageHeight: this.state.imageHeight + 10,
            imageWidth: this.state.imageWidth + 10,
        });
    }

    async startGame() {
        const wordInx = Math.floor(Math.random() * (19 - 0)) + 0;
        const rightWord = await this.getWord();
        const WrongWord1 = await this.getWord();
        const WrongWord2 = await this.getWord();
        const WrongWord3 = await this.getWord();

        Promise.all([rightWord, WrongWord1, WrongWord2, WrongWord3]).then(
            this.setState({
                id: rightWord[wordInx].id,
                word: rightWord[wordInx].word,
                translateWords: [
                    {
                        translate: rightWord[wordInx].wordTranslate,
                        id: rightWord[wordInx].id,
                    },
                    {
                        translate: WrongWord2[wordInx].wordTranslate,
                        id: WrongWord2[wordInx].id,
                    },
                    {
                        translate: WrongWord2[wordInx].wordTranslate,
                        id: WrongWord2[wordInx].id,
                    },
                    {
                        translate: WrongWord3[wordInx].wordTranslate,
                        id: WrongWord3[wordInx].id,
                    },
                ],
                wordClass: 'savannah__card-transition card-bottom',

            }),
        );
    }

    render() {
        const {
            word, translateWords, lives, id, wordClass, imageHeight, imageWidth,
        } = this.state;

        return (
            <div className="savannah">
                {this.state.lives && (
                    <SavannahLives
                        lives={lives}
                    />
                )}

                {this.state.lives && (
                    <SavannahWord
                        word={word}
                        id={id}
                        wordClass={wordClass}
                    />
                )}

                {this.state.word && this.state.lives
                    && (
                        <SavannahCards
                            translateWords={translateWords}
                            id={id}
                            lives={lives}
                            lostLive={this.lostLive}
                            getNextWord={this.getNextWord}
                            resizeImage={this.resizeImage}
                            timeIsOver={this.timeIsOver}

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

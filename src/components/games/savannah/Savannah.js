import React, { Component } from 'react';
import './savannah.scss';
import { SavannahCards } from './savannahCards';
import { SavannahLives } from './savannaLives';
import { SavannahWord } from './savannahWord';
import { SavannahImage } from './savannahImage';

export class Savannah extends Component {
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
    }

    componentWillMount() {
        this.startGame();
    }

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

    setTime() {

    }

    lostLive() {
        if (this.state.lives >= 1) {
            this.setState({
                lives: this.state.lives - 1,
            });
        } else {
            console.log('game over');
        }
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
                <SavannahLives
                    lives={lives}
                />
                {this.state.word
                 && (
                     <SavannahWord
                         word={word}
                         id={id}
                         wordClass={wordClass}
                     />
                 )}
                {this.state.word
                    && (
                        <SavannahCards
                            translateWords={translateWords}
                            id={id}
                            lostLive={this.lostLive}
                            getNextWord={this.getNextWord}
                            resizeImage={this.resizeImage}
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

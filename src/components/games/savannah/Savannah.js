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
            translate: null,
            wrongTranslate1: null,
            wrongTranslate2: null,
            wrongTranslate3: null,
            lives: 5,
        };
        this.getWord = this.getWord.bind(this);
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
                translate: rightWord[wordInx].wordTranslate,
                wrongTranslate1: WrongWord1[wordInx].wordTranslate,
                wrongTranslate2: WrongWord2[wordInx].wordTranslate,
                wrongTranslate3: WrongWord3[wordInx].wordTranslate,
            }),
        );
    }

    render() {
        const {
            word, translate, wrongTranslate1, wrongTranslate2, wrongTranslate3, lives, id,
        } = this.state;
        return (
            <div className="container">
                <SavannahLives
                    lives={lives}

                />
                <SavannahWord

                    word={word}

                />
                <SavannahCards
                    translate={translate}
                    wrongTranslate1={wrongTranslate1}
                    wrongTranslate2={wrongTranslate2}
                    wrongTranslate3={wrongTranslate3}
                />

                <SavannahImage />
            </div>
        );
    }
}

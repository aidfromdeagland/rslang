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
            word: 'some word',
            translate: 'some word',
            wrongTranslate1: 'some word',
            wrongTranslate2: 'some word',
            wrongTranslate3: 'some word',
        };
    }

    render() {
        return (
            <div className="container">
                <SavannahLives />
                <SavannahWord
                    word={this.state.word}

                />
                <SavannahCards
                    translate={this.state.translate}
                    wrongTranslate1={this.state.wrongTranslate1}
                    wrongTranslate2={this.state.wrongTranslate2}
                    wrongTranslate3={this.state.wrongTranslate3}
                />
                <SavannahImage />
            </div>
        );
    }
}

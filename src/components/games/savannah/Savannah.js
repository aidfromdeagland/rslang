import React, { Component } from 'react';
import './savannah.scss';
import { SavannahCards } from './savannahCards';
import { SavannahHearts } from './savannahHearts';
import { SavannahWord } from './savannahWord';
import { SavannahImage } from './savannahImage';

export class Savannah extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: '',
            translate: '',
            wrongTranslate1: '',
            wrongTranslate2: '',
            wrongTranslate3: '',
        };
    }

    render() {
        return (
            <div className="container">
                <SavannahHearts />
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

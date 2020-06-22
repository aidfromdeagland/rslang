import React, { Component } from 'react';
import './word.scss';
import PropTypes from 'prop-types';

const mediaPrefixUrl = 'https://raw.githubusercontent.com/aidfromdeagland/rslang-data/master/';

export class VocabularyWord extends Component {
    constructor(props) {
        super(props);
        this.id = props.word.id;
        this.word = props.word.word;
        this.image = `${mediaPrefixUrl}${props.word.image}`;
        this.audio = `${mediaPrefixUrl}${props.word.audio}`;
        this.audioMeaning = `${mediaPrefixUrl}${props.word.audioMeaning}`;
        this.audioExample = `${mediaPrefixUrl}${props.word.audioExample}`;
        this.textMeaning = props.word.textMeaning;
        this.textExample = props.word.textExample;
        this.transcription = props.word.transcription;
        this.wordTranslate = props.word.wordTranslate;
        this.textMeaningTranslate = props.word.textMeaningTranslate;
        this.textExampleTranslate = props.word.textExampleTranslate;
        this.lastUsed = new Date().toLocaleString('en-us', {
            weekday: 'short', month: 'long', day: 'numeric', hour: 'numeric',
        });
        this.repetitions = `${Math.floor(Math.random() * 15) + 1}`;
    }

    render() {
        return (
            <li className="vocabulary__word word-card">
                <div className="word-card__mainContainer">
                    <div className="word-card__mainTextContent">
                        <h4>{ this.word }</h4>
                        <p>{ this.transcription }</p>
                        <p>{ this.wordTranslate }</p>
                    </div>
                    <img className="word-card__image" src={this.image} alt={`an illustration for "${this.word}"`} />
                </div>
                <div className="word-card__additionalContainer">
                    <p className="word-card__example" dangerouslySetInnerHTML={{ __html: this.textExample }} />
                    <p className="word-card__meaning" dangerouslySetInnerHTML={{ __html: this.textMeaning }} />
                    <div className="word-card__training-info">
                        <p className="word-card__last-used">{ `last used: ${this.lastUsed}` }</p>
                        <p className="word-card__repetitions">{ `repetitions: ${this.repetitions}` }</p>
                    </div>
                </div>

            </li>
        );
    }
}

VocabularyWord.propTypes = {
    word: PropTypes.object.isRequired,
};

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
    }

    render() {
        return (
            <li className="vocabulary__word word-card">
                <div className="word-card__mainContainer">
                    <h4>{ this.word }</h4>
                    <p>{ this.transcription }</p>
                    <p>{ this.wordTranslate }</p>
                </div>
                <img src={this.image} alt={`illustration for "${this.word}"`} />
                <p dangerouslySetInnerHTML={{ __html: this.textExample }} />
                <p dangerouslySetInnerHTML={{ __html: this.textMeaning }} />
            </li>
        );
    }
}

VocabularyWord.propTypes = {
    word: PropTypes.object.isRequired,
};

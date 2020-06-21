import React, { Component } from 'react';
import './word.scss';
import PropTypes from 'prop-types';

export class VocabularyWord extends Component {
    constructor(props) {
        super(props);
        this.id = props.word.id;
        this.word = props.word.word;
        this.image = props.word.image;
        this.audio = props.word.audio;
        this.audioMeaning = props.word.audioMeaning;
        this.audioExample = props.word.audioExample;
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
                <h4>{ this.word }</h4>
                <p>{ this.wordTranslate }</p>
                <p dangerouslySetInnerHTML={{ __html: this.textExample }} />
                <p dangerouslySetInnerHTML={{ __html: this.textMeaning }} />
                <p>{ this.transcription }</p>
                <img src={this.image} alt={`illustration for "${this.word}"`} />
            </li>
        );
    }
}

VocabularyWord.propTypes = {
    word: PropTypes.object.isRequired,
};

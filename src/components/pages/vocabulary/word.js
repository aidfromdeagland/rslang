import React, { Component } from 'react';
import './word.scss';

export class VocabularyWord extends Component {
    constructor(props) {
        super(props);
        this.id = props.id;
        this.word = props.word;
        this.image = props.image;
        this.audio = props.audio;
        this.audioMeaning = props.audioMeaning;
        this.audioExample = props.audioExample;
        this.textMeaning = props.textMeaning;
        this.textExample = props.textExample;
        this.transcription = props.transcription;
        this.wordTranslate = props.wordTranslate;
        this.textMeaningTranslate = props.textMeaningTranslate;
        this.textExampleTranslate = props.textExampleTranslate;
        this.difficulty = props.difficulty;
        this.counter = props.counter;
        this.lastUsed = props.lastUsed;
    }
    render() {
        return (

        );
    }
}

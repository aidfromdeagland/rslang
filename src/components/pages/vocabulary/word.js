import React, { Component } from 'react';
import './word.scss';
import PropTypes from 'prop-types';
import { Button } from '../../shared/button';
import { MEDIA_PREFIX_URL } from '../../../constants/globalConstants';

export class VocabularyWord extends Component {
    constructor(props) {
        super(props);
        this.settings = props.settings;
        this.id = props.word.id;
        this.word = props.word.word;
        this.image = `${MEDIA_PREFIX_URL}${props.word.image}`;
        this.audio = `${MEDIA_PREFIX_URL}${props.word.audio}`;
        this.audioMeaning = `${MEDIA_PREFIX_URL}${props.word.audioMeaning}`;
        this.audioExample = `${MEDIA_PREFIX_URL}${props.word.audioExample}`;
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

    onAudioClickHandler = () => {
        new Audio(this.audio).play();
    }

    render() {
        return (
            <li className="vocabulary__word word-card">
                <div className="word-card__mainContainer">
                    <div className="word-card__mainTextContainer">

                        <h4>{ this.word }</h4>
                        <Button title="" className="vocabulary__button vocabulary__button_audio" isDisabled={false} onClick={this.onAudioClickHandler} />
                        {this.settings.additionalSettings.transcription
                            ? <p>{ this.transcription }</p> : null}
                        {this.settings.mainSettings.word ? <p>{ this.wordTranslate }</p> : null}
                    </div>
                    {this.settings.additionalSettings.image ? <img className="word-card__image" src={this.image} alt={`an illustration for "${this.word}"`} /> : null }
                </div>
                <div className="word-card__additionalContainer">
                    {this.settings.mainSettings.sentence ? <p className="word-card__example" dangerouslySetInnerHTML={{ __html: this.textExample }} /> : null}
                    {this.settings.mainSettings.textMeaning ? <p className="word-card__meaning" dangerouslySetInnerHTML={{ __html: this.textMeaning }} /> : null}
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
    settings: PropTypes.object.isRequired,
};

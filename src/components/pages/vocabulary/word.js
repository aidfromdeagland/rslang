import React, { Component } from 'react';
import './word.scss';
import PropTypes from 'prop-types';
import { Button } from '../../shared/button';
import { MEDIA_PREFIX_URL } from '../../../constants/globalConstants';

const defaultLocale = 'en-gb';
const defaultDateFormat = {
    month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric',
};
const shortDateFormat = { month: 'short', day: 'numeric' };

/* eslint-disable react/prop-types */
export class VocabularyWord extends Component {
    constructor(props) {
        super(props);
        this.audioPlayer = new Audio();
    }

    onAudioClickHandler = (audioSrc) => {
        if (this.audioPlayer.readyState === 0 || this.audioPlayer.readyState === 2) {
            this.audioPlayer.src = audioSrc;
            this.audioPlayer.play();
        }
    }

    render() {
        const {
            word, settings, isSpecial, removeWordHandler,
        } = this.props;
        const imageSrc = `${MEDIA_PREFIX_URL}${word.image}`;
        const audioSrc = `${MEDIA_PREFIX_URL}${word.audio}`;

        return (
            <li className="vocabulary__word word-card">
                <div className="word-card__mainContainer">
                    <div className="word-card__mainTextContainer">
                        { isSpecial
                            ? (
                                <Button
                                    className="vocabulary__button vocabulary__button_restore"
                                    title="Restore"
                                    isDisabled={false}
                                    onClick={() => removeWordHandler(word.id)}
                                />
                            )
                            : null }
                        <h4>{ word.word }</h4>
                        <Button title="" className="vocabulary__button vocabulary__button_audio" isDisabled={false} onClick={() => this.onAudioClickHandler(audioSrc)} />
                        {settings.showWordTranscription && <p>{ word.transcription }</p>}
                        {settings.showWordTranslate && <p>{ word.wordTranslate }</p>}
                    </div>
                    {settings.showWordImage && <img className="word-card__image" src={imageSrc} alt={`an illustration for "${word.word}"`} />}
                </div>
                <div className="word-card__additionalContainer">
                    {settings.showSentenceExample && <p className="word-card__example" dangerouslySetInnerHTML={{ __html: word.textExample }} />}
                    {settings.showSentenceExample && settings.showSentencesTranslate
                    && (
                        <p className="word-card__example word-card__example_translate">
                            {word.textExampleTranslate}
                        </p>
                    ) }
                    {settings.showSentenceMeaning
                    && (
                        <div className="word-card__meaning-containrer">
                            <p className="word-card__meaning" dangerouslySetInnerHTML={{ __html: word.textMeaning }} />
                            {settings.showSentencesTranslate
                        && (
                            <p className="word-card__meaning word-card__meaning_translate">
                                {word.textMeaningTranslate}
                            </p>
                        )}
                        </div>
                    )}
                    <div className="word-card__training-info">
                        <div className="word-card__bottom-left-container">
                            <p className="word-card__last-used">{ `last used: ${new Date(word.userWord.optional.prevDate).toLocaleString(defaultLocale, defaultDateFormat)}` }</p>
                            <p className="word-card__next-use">{ `scheduled: ${new Date(word.userWord.optional.nextDate).toLocaleString(defaultLocale, shortDateFormat)}` }</p>
                        </div>
                        <div className="word-card__bottom-right-container">
                            <p className="word-card__repetitions">{ `repeats: ${word.userWord.optional.repeats}` }</p>
                        </div>
                    </div>
                </div>

            </li>
        );
    }
}

VocabularyWord.defaultProps = {
    settings: {
        mainSettings: {
            word: true,
            sentence: true,
            textMeaning: true,
        },
        additionalSettings: {
            transcription: true,
            image: true,
        },
    },
    isSpecial: false,
    removeWordHandler: PropTypes.func,
};

VocabularyWord.propTypes = {
    word: PropTypes.objectOf(PropTypes.oneOfType(
        [PropTypes.string, PropTypes.number, PropTypes.object],
    )).isRequired,
    settings: PropTypes.shape({
        mainSettings: PropTypes.shape({
            word: PropTypes.bool,
            sentence: PropTypes.bool,
            textMeaning: PropTypes.bool,
        }),
        additionalSettings: PropTypes.shape({
            transcription: PropTypes.bool,
            image: PropTypes.bool,
        }),
    }),
    isSpecial: PropTypes.bool,
    removeWordHandler: PropTypes.func,
};

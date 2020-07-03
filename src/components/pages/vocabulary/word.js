import React, { Component } from 'react';
import './word.scss';
import PropTypes from 'prop-types';
import { Button } from '../../shared/button';
import { MEDIA_PREFIX_URL } from '../../../constants/globalConstants';

export class VocabularyWord extends Component {
    onAudioClickHandler = (audioSrc) => {
        new Audio(audioSrc).play();
    }

    render() {
        const {
            word, settings, isSpecial, removeWordHandler,
        } = this.props;
        const imageSrc = `${MEDIA_PREFIX_URL}${word.image}`;
        const audioSrc = `${MEDIA_PREFIX_URL}${word.audio}`;
        const currentDate = new Date().toLocaleString('en-gb', { month: 'short', day: 'numeric' });
        const getRandomRepeats = () => Math.floor(Math.random() * 10 + 1);
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
                        {settings.additionalSettings.transcription
                            ? <p>{ word.word.transcription }</p> : null}
                        {settings.mainSettings.word ? <p>{ word.word.wordTranslate }</p> : null}
                    </div>
                    {settings.additionalSettings.image ? <img className="word-card__image" src={imageSrc} alt={`an illustration for "${word.word}"`} /> : null }
                </div>
                <div className="word-card__additionalContainer">
                    {settings.mainSettings.sentence ? <p className="word-card__example" dangerouslySetInnerHTML={{ __html: word.textExample }} /> : null}
                    {settings.mainSettings.textMeaning ? <p className="word-card__meaning" dangerouslySetInnerHTML={{ __html: word.textMeaning }} /> : null}
                    <div className="word-card__training-info">
                        <div className="word-card__bottom-left-container">
                            <p className="word-card__last-used">{ `last used: ${currentDate}` }</p>
                            <p className="word-card__next-use">{ `next repeat: ${currentDate}` }</p>
                        </div>
                        <div className="word-card__bottom-right-container">
                            <p className="word-card__repetitions">{ `repeats: ${getRandomRepeats()}` }</p>
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

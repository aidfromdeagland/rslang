/* eslint-disable jsx-a11y/click-events-have-key-events,
jsx-a11y/no-noninteractive-element-interactions */

import React, { Component } from 'react';

export class ItemWord extends Component {
    constructor(props) {
        super(props);
        this.audioPlayer = new Audio();
    }

    handleClickCard = (index, audioUrl, imageUrl, translate) => {
        const { handleClickCard } = this.props;
        handleClickCard(index, audioUrl, imageUrl, translate);
        if (this.audioPlayer.src !== `https://raw.githubusercontent.com/aidfromdeagland/rslang-data/master/${audioUrl}`) {
            this.audioPlayer.src = `https://raw.githubusercontent.com/aidfromdeagland/rslang-data/master/${audioUrl}`;
        }
        this.audioPlayer.play();
    }

    render() {
        const {
            wordData,
            cardIndex,
            indexClickedCard,
            isClickedCard,
            isGameModeTrain,
            correctWords,
        } = this.props;
        return (
            <li
                className={
                    (() => {
                        if (isGameModeTrain) {
                            return cardIndex === indexClickedCard && isClickedCard
                                ? 'speakit-card speakit-card_active'
                                : 'speakit-card';
                        }
                        if (!correctWords.length) {
                            return 'speakit-card';
                        }
                        if (correctWords.includes(wordData.word.toLowerCase())) {
                            return 'speakit-card speakit-card_match';
                        }
                        return 'speakit-card';
                    })()
                }
                onClick={() => {
                    if (!isGameModeTrain) {
                        return null;
                    }
                    return this.handleClickCard(
                        cardIndex,
                        wordData.wordAudio,
                        wordData.wordImage,
                        wordData.wordTranslate,
                    );
                }}
            >
                <p className="speakit-card__word">{wordData.word}</p>
                <p className="speakit-card__transcription">{wordData.wordTranscription}</p>
            </li>
        );
    }
}

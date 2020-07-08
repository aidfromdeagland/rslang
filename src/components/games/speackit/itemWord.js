import React, { Component } from 'react';

let audio;
let audioPlay;

export class ItemWord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlayingAudio: false,
        };
    }

    handlePlayAudio = (url) => {
        if (audioPlay) {
            audioPlay.then(() => {
                audio.pause();
                audio = new Audio(url);
                audioPlay = audio.play();
                audio.onplaying = () => {
                    this.setState({ isPlayingAudio: true });
                };
                audio.onended = () => {
                    this.setState({ isPlayingAudio: false });
                };
                audio.onpause = () => {
                    this.setState({ isPlayingAudio: false });
                };
            });
        } else {
            audio = new Audio(url);
            audioPlay = audio.play();
            audio.onplaying = () => {
                this.setState({ isPlayingAudio: true });
            };
            audio.onended = () => {
                this.setState({ isPlayingAudio: false });
            };
            audio.onpause = () => {
                this.setState({ isPlayingAudio: false });
            };
        }
    }

    handleClickCard = (index, audioUrl, imageUrl, translate) => {
        this.props.handleClickCard(index, audioUrl, imageUrl, translate);
        this.handlePlayAudio(`https://raw.githubusercontent.com/aidfromdeagland/rslang-data/master/${audioUrl}`);
    }

    render() {
        const {
            wordData,
            cardIndex,
            indexClickedCard,
            isClickedCard,
            handleClickCard
        } = this.props;
        return (
            <li
                className={cardIndex === indexClickedCard && isClickedCard ? 'card card_active' : 'card'}
                onClick={() => this.handleClickCard(cardIndex, wordData.wordAudio, wordData.wordImage, wordData.wordTranslate)}
            >
                <p className="card__word">{wordData.word}</p>
                <p className="card__transcription">{wordData.wordTranscription}</p>
            </li>
        );
    }
}

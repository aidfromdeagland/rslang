/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */

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
            handleClickCard,
            isGameModeTrain,
            speakWord,
            correctWords,
        } = this.props;
        return (
            <li
                className={
                    (() => {
                        if (isGameModeTrain) {
                            return cardIndex === indexClickedCard && isClickedCard
                                ? 'card card_active'
                                : 'card';
                        }
                        if (!correctWords.length) {
                            return 'card';
                        }

                        if (correctWords.includes(wordData.word)) {
                            return 'card card_match';
                        }

                        return 'card';

                        // let name = '';
                        // console.log(correctWords)
                        // correctWords.forEach((word) => {
                        //     console.log(word, wordData.word)
                        //     if (word === wordData.word) {
                        //         name = 'card card_match';
                        //         return;
                        //     }
                        //     name = 'card';
                        // });
                        // return name;
                    })()
                }
                // className={isGameModeTrain && cardIndex === indexClickedCard && isClickedCard
                //     ? 'card card_active'
                //     : speakWord && speakWord.toLowerCase() === wordData.word
                //         ? 'card card_match'
                //         : 'card'}
                onClick={() => this.handleClickCard(cardIndex, wordData.wordAudio, wordData.wordImage, wordData.wordTranslate)}
            >
                <p className="card__word">{wordData.word}</p>
                <p className="card__transcription">{wordData.wordTranscription}</p>
            </li>
        );
    }
}

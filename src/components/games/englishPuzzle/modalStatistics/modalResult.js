import React, { Component } from 'react';
import './modalResult.scss';
import { Button } from '../../../shared/button';

let audio;
let audioPlay;
export class ModalResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModal: false,
            isPlayingAudio: false,
        };
    }

    handleCloseModal = () => {
        this.setState((prev) => ({
            isOpenModal: !prev.isOpenModal,
        }));
    }

    handleClickAudio = (result, index) => {
        const { results } = this.props;
        const url = results[result][index].audioUrl;
        this.setState({ playingIndex: index });
        this.handlePlayAudio(url);
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

    render() {
        const { results, handleByNextRound } = this.props;
        const { isPlayingAudio, playingIndex } = this.state;
        return (
            <div id="openModal" className="modal-result">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="round-results">
                                <div className="dont-know result">
                                    <div className="dont-know__title result-title">
                                        I don&apos;t know:
                                        <span>
                                            {results.dontKnow.length}
                                        </span>
                                    </div>
                                    <div className="result-body">
                                        {results.dontKnow.map((result, index) => {
                                            return (
                                                <div key={index}>
                                                    <button
                                                        className={isPlayingAudio && playingIndex === index
                                                            ? "dynamic-btn playing"
                                                            : "dynamic-btn"}
                                                        onClick={() => this.handleClickAudio('dontKnow', index)}
                                                    />
                                                    <span>{result.sentence}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="know result">
                                    <div className="know-title result-title">
                                        I know:
                                        <span>
                                            {results.know.length}
                                        </span>
                                    </div>
                                    <div className="result-body">
                                        {results.know.map((result, index) => {
                                            return (
                                                <div>
                                                    <button className={isPlayingAudio ? "dynamic-btn playing" : "dynamic-btn"} onClick={() => this.handleClickAudio('know', index)} />
                                                    <span>{result.sentence}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button className="close-modal-ok button" onClick={handleByNextRound} title="Continue" />
                    </div>
                </div>
            </div>
        );
    }
}

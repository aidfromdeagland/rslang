import React, { Component } from 'react';
import './modalResult.scss';
import { Button } from '../../../shared/button';

export class ModalResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModal: false,
        };
    }

    handleCloseModal = () => {
        this.setState((prev) => ({
            isOpenModal: !prev.isOpenModal,
        }));
    }

    handlePlayAudio = (result, index) => {
        const url = this.props.results[result][index].audioUrl;
        const audio = new Audio(url);
        audio.play();
    }

    render() {
        return (
            <div id="openModal" className="modal-result">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="round-results">
                                <div className="dont-know result">
                                    <div className="dont-know__title result-title">I don&apos;t know: <span>{this.props.results.dontKnow.length}</span></div>
                                    <div className="result-body">
                                        {this.props.results.dontKnow.map((result, index) => {
                                            return (
                                                <div>
                                                    <button className="dynamic-btn" onClick={() => this.handlePlayAudio('dontKnow', index)} />
                                                    <span>{result.sentence}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="know result">
                                    <div className="know-title result-title">I know: <span>{this.props.results.know.length}</span></div>
                                    <div className="result-body">
                                        {this.props.results.know.map((result, index) => {
                                            return (
                                                <div>
                                                    <button className="dynamic-btn" onClick={() => this.handlePlayAudio('know', index)} />
                                                    <span>{result.sentence}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button className="close-modal-ok button" onClick={this.props.handleByNextRound} title="Continue" />
                    </div>
                </div>
            </div>
        );
    }
}

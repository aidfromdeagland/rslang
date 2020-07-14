import React, { Component } from 'react';
import './modalResult.scss';
import { Button } from '../../../shared/button';

export class ModalResult extends Component {

    render() {
        const { handleByNextRound, totalSpokenWords, correctWords } = this.props;
        return (
            <div id="openModal" className="modal-result-speakit">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="round-results">
                                <div className="all-spoken-words speakit-result-field">
                                    Total words spoken:
                                    <span>
                                        {totalSpokenWords}
                                    </span>
                                </div>
                                <div className="correct-spoken-words speakit-result-field">
                                    Number of correctly spoken words:
                                    <span>
                                        {correctWords}
                                    </span>
                                </div>
                                <div className="percent-correct-words speakit-result-field">
                                    Percentage of correctly spoken words:
                                    <span>
                                        {`${Math.floor((correctWords * 100) / totalSpokenWords)}%`}
                                    </span>
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

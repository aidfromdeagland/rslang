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

    render() {
        return (
            <div id="openModal" className="modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/* <Button className="close-modal close" onClick={this.props.closeModal} title="×" /> */}
                        </div>
                        <div className="modal-body">
                            <div className="round-results">
                                <div className="dont-know result">
                                    <div className="dont-know__title result-title">I don&apos;t know</div>
                                    <div>
                                        {this.props.results.dontKnow.map((result) => <span>{result.sentence}</span>)}
                                    </div>
                                </div>
                                <div className="know result">
                                    <div className="know-title result-title">I know</div>
                                    <div>
                                        {this.props.results.know.map((result) => <span>{result.sentence}</span>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button className="close-modal-ok button" onClick={(e) => this.props.onClick} title="OK" />
                    </div>
                </div>
            </div>
        );
    }
}

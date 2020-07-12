import React, { Component } from 'react';
/* import '../modal.scss'; */
import { Button } from '../../../shared/button';

export class ModalWarning extends Component {
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
                            <Button className="close-modal close" onClick={this.props.closeModal} title="×" />
                        </div>
                        <div className="modal-body">
                            {this.props.children}
                        </div>
                        <Button className="close-modal-ok button" onClick={(e) => this.props.onClick} title="OK" />
                    </div>
                </div>
            </div>
        );
    }
}

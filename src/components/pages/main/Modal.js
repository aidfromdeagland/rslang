import React, { Component } from 'react';
import './modal.scss';
import { Checkbox } from './CheckBox';
import { Button } from '../../shared/button';

export class Modal extends Component {
    render() {
        return (
                <div id="openModal" className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <Button className="close-modal close" onClick={this.props.closeModal} title="×" />
                            </div>
                            <div className="modal-body">
                                <Checkbox text='Show translation' />
                                <Checkbox text='Show transcription' />
                                <Checkbox text='Show picture' />
                                <Checkbox text='Show example sentences' />
                                <Checkbox text='Show offer translation' />
                             </div>
                             <Button className="close-modal-ok button" onClick={this.props.closeModal} title="OK" />
                        </div>
                    </div>
                </div>
        );
    }
}

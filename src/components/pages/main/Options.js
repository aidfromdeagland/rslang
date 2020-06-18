import React, { Component } from 'react';
import './main.scss';
import { Button } from '../../shared/button';
import { Modal } from './Modal';
import { Select } from './Select';

export class Options extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModal: false,
        }
    }

    handleCloseModal = () => {
        this.setState(prev => ({
            isOpenModal: !prev.isOpenModal
        }));
    }

    handleClickSettings = () => {
        this.setState(prev => ({
            isOpenModal: !prev.isOpenModal
        }));
        console.log(this.state.isOpenModal)
    }

    render() {
        return (
            <div className="main-page_options">
                {this.state.isOpenModal ? <Modal closeModal={this.handleCloseModal} /> : null}
                <div className="options-settings">
                    <Button className="button" title='Settings' onClick={this.handleClickSettings} />
                    <Select />
                </div>
                <div className="options-learning">
                    <Button className="button" title='Learn new words' />
                    <Button className="button" title='Repeat words' />
                </div>
            </div>
        );
    }
}

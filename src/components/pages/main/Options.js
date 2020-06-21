import React, { Component } from 'react';
import './main.scss';
import { Button } from '../../shared/button';
import { Modal } from './Modal';
import { Dropdown } from './Dropdown';
import { NavLink } from 'react-router-dom';

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
    }

    render() {
        return (
            <div className="main-page_options">
                {this.state.isOpenModal ? <Modal closeModal={this.handleCloseModal} /> : null}
                <div className="options-settings">
                    <Button className="button" title='Settings' onClick={this.handleClickSettings} />
                    <Dropdown />
                </div>
                <div className="options-learning">
                    <NavLink to={`/main/study`} className='learning-words'>
                        <Button className="button" title='Learn new words' />
                    </NavLink>
                    <NavLink to={`/main/study`} className='learning-words'>
                        <Button className="button" title='Repeat words' />
                    </NavLink>
                </div>
            </div>
        );
    }
}

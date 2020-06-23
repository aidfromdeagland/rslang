import React, { Component } from 'react';
import './main.scss';
import { Button } from '../../shared/button';
import { Modal } from './Modal';
import { Dropdown } from './dropDown/Dropdown';
// import { NavLink } from 'react-router-dom';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

export class Options extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModal: false,
            notWordForLearn: false,
        };
    }

    handleCloseModal = () => {
        this.setState(prev => ({
            isOpenModal: !prev.isOpenModal,
        }));
    }

    handleClickSettings = () => {
        this.setState(prev => ({
            isOpenModal: !prev.isOpenModal,
        }));
    }

    checkingForNewWordsToLearn = (event) => {
        if (this.props.needLearnWordsToday < 1) {
            event.preventDefault();
            this.setState({
                notWordForLearn: true
            });
            this.setState(prev => ({
                isOpenModal: !prev.isOpenModal,
            }));
        }
    }

    render() {
        return (
            <div className="main-page_options">
                {this.state.isOpenModal ? <Modal closeModal={this.handleCloseModal} /> : null}
                {/* {(this.state.isOpenModal && this.state.notWordForLearn)  ? <Modal2
                closeModal={this.handleCloseModal}
                children='Choose words' /> : null} */}
                <div className="options-settings">
                    <Button className="button" title='Settings' onClick={this.handleClickSettings} />
                    <Dropdown />
                </div>
                <div className="options-learning">
                    <NavLink to={{
                        pathname: `/main/study`,
                        title: {about: 'info'},
                    }}
                        // className='learning-words'
                    >
                        <Button className="button" title='Learn new words' />
                    </NavLink>
                    <NavLink to={`/main/study`} className='learning-words'>
                        <Button className="button" title='Repeat words' />
                    </NavLink>
                </div>
            </div >
        );
    }
}

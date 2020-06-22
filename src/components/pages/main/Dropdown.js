import React, { Component } from 'react';
import './dropdown.scss';
import { Button } from '../../shared/button';
import { DropdownList } from './DropdownList';

export class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDropWordOpen: false,
            isDropCardsOpen: false,
            numberWords: 1,
            numberCards: 1
        }
    }

    chooseNumberWords = (number) => {
        this.setState({numberWords: number});
    }

    chooseNumberCards = (number) => {
        this.setState({numberCards: number});
    }

    handleClickDropdownWords = () => {
        this.setState(prev => ({
            isDropWordOpen: !prev.isDropWordOpen
        }));
    }

    handleClickDropdownCards = () => {
        this.setState(prev => ({
            isDropCardsOpen: !prev.isDropCardsOpen
        }));
    }

    render() {
        return (
            <div className="settings__options_container">
                <div className={`dropdown ${this.state.isDropWordOpen ? 'open' : ''}`}>
                    <Button className="mainmenubtn button" title={`Learn words a day: ${this.state.numberWords}`} onClick={this.handleClickDropdownWords} />
                    {this.state.isDropWordOpen ? <DropdownList chooseNumber={this.chooseNumberWords} closeDropdown={this.handleClickDropdownWords} /> : null}
                </div>
                <div className={`dropdown ${this.state.isDropCardsOpen ? 'open' : ''}`}>
                    <Button className="mainmenubtn button" title={`Number of cards a day: ${this.state.numberCards}`} onClick={this.handleClickDropdownCards} />
                    {this.state.isDropCardsOpen ? <DropdownList chooseNumber={this.chooseNumberCards} closeDropdown={this.handleClickDropdownCards} /> : null}
                </div>
            </div>
        );
    }
}

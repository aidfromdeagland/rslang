import React, { Component } from 'react';
import './dropdown.scss';
import { Button } from '../../shared/button';
import { DropdownList } from './DropdownList';

export class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            isDropOpen: false,
            numberWords: 1
        }
    }

    chooseNumberWords = (number) => {
        this.setState({numberWords: number});
    }

    handleClickDropdown = () => {
        this.setState(prev => ({
            isDropOpen: !prev.isDropOpen
        }));
    }

    render() {
        const defaultNumber = 1;
        return (
            <div className="settings__options_container">
                <div className={`dropdown ${this.state.isDropOpen ? 'open' : ''}`}>
                    <Button className="mainmenubtn button" title={`Learn words a day: ${this.state.numberWords}`} onClick={this.handleClickDropdown} />
                    {this.state.isDropOpen ? <DropdownList chooseNumber={this.chooseNumberWords} closeDropdown={this.handleClickDropdown} /> : null}
                </div>
            </div>
        );
    }
}

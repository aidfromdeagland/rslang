import React, { Component } from 'react';
import './dropDown.scss';
import { Button } from '../../../shared/button';
import { DropdownList } from './DropDownList';

export class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDropLevelOpen: false,
            isDropPageOpen: false,
            isDropWordOpen: false,
            numberLevel: this.props.level,
            numberPage: this.props.page,
            numberWords: 1,
        };
    }

    chooseNumberLevels = (number) => {
        this.setState({ numberLevel: number });
    }

    chooseNumberPages = (number) => {
        this.setState({ numberPage: number });
    }

    handleClickDropdownLevels = () => {
        this.setState((prev) => ({
            isDropLevelOpen: !prev.isDropLevelOpen,
        }));
    }

    handleClickDropdownPages = () => {
        this.setState((prev) => ({
            isDropPageOpen: !prev.isDropPageOpen,
        }));
    }

    chooseNumberWords = (number) => {
        this.setState({ numberWords: number });
    }

    handleClickDropdownWords = () => {
        this.setState((prev) => ({
            isDropWordOpen: !prev.isDropWordOpen,
        }));
    }

    handleButtonSelect = () => {
        this.props.selectLevel(this.state.numberLevel, this.state.numberPage);
    }

    render() {
        const {
            isDropLevelOpen,
            numberLevel,
            numberPage,
            isDropPageOpen,
            isDropWordOpen,
            numberWords,
        } = this.state;
        return (
            <div className="dropdown__options_container">
                <div className={`dropdown ${isDropLevelOpen ? 'open' : ''}`}>
                    Level:
                    <Button className="mainmenubtn button" title={`${numberLevel}`} onClick={this.handleClickDropdownLevels} />
                    {isDropLevelOpen ? <DropdownList chooseNumber={this.chooseNumberLevels} closeDropdown={this.handleClickDropdownLevels} totalNumber="6" /> : null}
                </div>
                <div className={`dropdown ${isDropPageOpen ? 'open' : ''}`}>
                    Page:
                    <Button className="mainmenubtn button" title={`${numberPage}`} onClick={this.handleClickDropdownPages} />
                    {isDropPageOpen ? <DropdownList chooseNumber={this.chooseNumberPages} closeDropdown={this.handleClickDropdownPages} totalNumber="60" /> : null}
                </div>
                <Button className="button select-level" title="Select" onClick={this.handleButtonSelect} />
            </div>
        );
    }
}

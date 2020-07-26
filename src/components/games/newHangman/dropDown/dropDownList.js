/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import './dropDown.scss';

export class DropdownList extends Component {
    dropdownChildHandle = (index) => {
        const {
            chooseNumber,
            closeDropdown,
        } = this.props;
        chooseNumber(index + 1);
        closeDropdown();
    }

    render() {
        const {
            totalNumber,
        } = this.props;
        const numbers = Array(parseFloat(totalNumber)).fill(null);
        return (
            <div className="dropdown-child">
                {numbers.map((number, index) => (
                    <div
                        onClick={() => {
                            this.dropdownChildHandle(index);
                        }}
                        key={index}
                    >
                        {index + 1}
                    </div>
                ))}
            </div>
        );
    }
}

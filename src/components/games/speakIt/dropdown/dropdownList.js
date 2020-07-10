import React, { Component } from 'react';
import './dropdown.scss';

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
                {numbers.map((number, index) => {
                    return (
                        <div
                            onClick={() => {
                                this.dropdownChildHandle(index);
                            }}
                            key={index}
                        >
                            {index + 1}
                        </div>
                    );
                })}
            </div>
        );
    }
}

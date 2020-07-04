import React, { Component } from 'react';
import './dropDown.scss';

export class DropdownList extends Component {
    dropdownChildHandle = (index) => {
        this.props.chooseNumber(index + 1);
        this.props.closeDropdown();
    }

    render() {
        const numbers = Array(parseFloat(this.props.totalNumber)).fill(null);
        return (
            <div className="dropdown-child">
                {numbers.map((number, index) => {
                    return (
                        <div
                            onClick={() => {
                                this.dropdownChildHandle(index);
                            }}
                            key={index}>
                            {index + 1}
                        </div>
                    );
                })}
            </div>
        );
    }
}
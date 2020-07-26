/* eslint-disable react/no-array-index-key,
jsx-a11y/no-static-element-interactions,
jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import './dropdown.scss';

export class DropdownList extends Component {
    dropdownChildHandle = (index) => {
        this.props.chooseNumber(index + 1);
        this.props.closeDropdown();
    }

    render() {
        const numbers = Array(30).fill(null);
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

import React, { Component } from 'react';
import './dropdown.scss';

export class DropdownList extends Component {
    dropdownChildHandle = (index) => {
        this.props.chooseNumber(index + 1);
        this.props.closeDropdown();
    }

    render() {
        const Numbers = Array(30).fill(null);
        return (
            <div className="dropdown-child">
                {Numbers.map((number, index) => {
                    return (<div
                        onClick={(index) => {
                            this.dropdownChildHandle(index);
                        }}>
                        {index + 1}
                    </div>);
                })}
            </div>
        );
    }
}

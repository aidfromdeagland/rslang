import React, { Component } from 'react';
import './dropdown.scss';

export class DropdownList extends Component {
    dropdownChildHandle = (index) => {
        console.log(index)
        this.props.chooseNumber(index + 1);
        this.props.closeDropdown();
    }

    render() {
        const Numbers = Array(30).fill(null);
        return (
            <div className="dropdown-child">
                {Numbers.map((number, index) => {
                    const i = index;
                    return (<div
                        onClick={(i) => {
                            console.log(index)
                            this.dropdownChildHandle(index);
                        }}>
                        {index + 1}
                    </div>);
                })}
            </div>
        );
    }
}

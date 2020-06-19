import React, { Component } from 'react';
import './dropdown.scss';

export class DropdownList extends Component {
    render() {
        const Numbers = Array(30).fill(null);
        return (
            <div className="dropdown-child">
                {Numbers.map((number, index) => {
                    return <div onClick={() => {
                        this.props.chooseNumber(index + 1);
                        this.props.closeDropdown();
                        }}>
                        {index + 1}
                    </div>
                })}
            </div>
        );
    }
}

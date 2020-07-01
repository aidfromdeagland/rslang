import React, { Component } from 'react';
import './checkBox.scss';

export class Checkbox extends Component {
    render() {
        const {checkBoxHandle, text, checked} = this.props;
        return (
            <label>
                <input type="checkbox" className="option-input checkbox" onChange={checkBoxHandle} checked={checked} />
                {text}
            </label>
        );
    }
}

import React, { Component } from 'react';
import './checkBox.scss';

export class Checkbox extends Component {
    render() {
        const {onChange, text, isChecked, isInvalidSettings} = this.props;
        return (
            <label>
                <input type="checkbox" className={isInvalidSettings ? "option-input checkbox invalid-property" : "option-input checkbox"} onChange={onChange} checked={isChecked} />
                {text}
            </label>
        );
    }
}

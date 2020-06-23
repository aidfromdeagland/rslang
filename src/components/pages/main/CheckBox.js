import React, { Component } from 'react';
import './checkBox.scss';

export class Checkbox extends Component {
    render() {
        const {onChange, text} = this.props;
        return (
            <label>
                <input type="checkbox" className="option-input checkbox" onChange={onChange} checked={this.props.checked} />
                {text}
            </label>
        );
    }
}

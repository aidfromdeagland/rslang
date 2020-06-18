import React, { Component } from 'react';
import './checkBox.scss';

export class Checkbox extends Component {
    render() {
        return (
            <label>
                <input type="checkbox" className="option-input checkbox" />
                {this.props.text}
            </label>
        );
    }
}

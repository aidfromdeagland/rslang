import React, { Component } from 'react';
import './checkBox.scss';

export class Checkbox extends Component {
    render() {
        const {onClick, text} = this.props;
        return (
            <label>
                <input type="checkbox" className="option-input checkbox" onClick={onClick} checked={this.props.checked} />
                {text}
            </label>
        );
    }
}

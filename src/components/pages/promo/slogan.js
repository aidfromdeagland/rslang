import React, { Component } from 'react';
import './slogan.scss';

const defaultAltAttr = 'image';

export class Slogan extends Component {
    render() {
        return (
            <li className="slogan__item">
                <img className="slogan__image" src={this.props.image} alt={defaultAltAttr} />
                <p className="slogan__text">{this.props.text}</p>
            </li>
        );
    }
}

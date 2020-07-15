import React, { Component } from 'react';
import './slogan.scss';
import PropTypes from 'prop-types';

const defaultAltAttr = 'image';

export class Slogan extends Component {
    constructor(props) {
        super(props);
        this.image = props.image;
        this.text = props.text;
    }

    render() {
        return (
            <li className="slogan__item">
                <img className="slogan__image" src={this.image} alt={defaultAltAttr} />
                <p className="slogan__text">{this.text}</p>
            </li>
        );
    }
}

Slogan.propTypes = {
    image: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

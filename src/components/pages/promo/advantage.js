import React, { Component } from 'react';
import './advantage.scss';
import PropTypes from 'prop-types';

const defaultAltAttr = 'image';

export class Advantage extends Component {
    constructor(props) {
        super(props);
        this.image = props.image;
        this.header = props.header;
        this.text = props.text;
    }

    render() {
        return (
            <li className="advantage">
                <div className="advantage__content">
                    <div className="advantage__header">
                        <img className="advantage__image" src={this.image} alt={defaultAltAttr} />
                        <h3 className="advantage__heading">{this.header}</h3>
                    </div>
                    <p className="advantage__text">{this.text}</p>
                </div>
            </li>
        );
    }
}

Advantage.propTypes = {
    image: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

import React, { Component } from 'react';
import './advantage.scss';

const defaultAltAttr = 'image';

export class Advantage extends Component {
    render() {
        return (
            <li className="advantage">
                <div className="advantage__header">
                    <img className="advantage__image" src={this.props.image} alt={defaultAltAttr} />
                    <h3 className="advantage__heading">{this.props.header}</h3>
                </div>
                <p className="advantage__text">{this.props.text}</p>
            </li>
        );
    }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class SavannahCards extends Component {
    render() {
        const {
            translate, wrongTranslate1, wrongTranslate2, wrongTranslate3,
        } = this.props;
        return (
            <div className="container__cards">
                <div className="card">{translate}</div>
                <div className="card">{wrongTranslate1}</div>
                <div className="card">{wrongTranslate2}</div>
                <div className="card">{wrongTranslate3}</div>
            </div>
        );
    }
}

SavannahCards.propTypes = {
    translate: PropTypes.string.isRequired,
    wrongTranslate1: PropTypes.string.isRequired,
    wrongTranslate2: PropTypes.string.isRequired,
    wrongTranslate3: PropTypes.string.isRequired,
};

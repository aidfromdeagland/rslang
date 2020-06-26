import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class SavannahWord extends Component {
    render() {
        const { word, wordClass } = this.props;
        return (
            <div className={wordClass}>
                {word}
            </div>
        );
    }
}

SavannahWord.propTypes = {
    word: PropTypes.string.isRequired,
    wordClass: PropTypes.string.isRequired,
};

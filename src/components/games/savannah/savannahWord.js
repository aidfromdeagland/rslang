import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class SavannahWord extends Component {
    render() {
        const { word, wordClass } = this.props;
        return (
            <div className={wordClass}>
                {word.word}
            </div>
        );
    }
}

SavannahWord.propTypes = {
    word: PropTypes.objectOf(PropTypes.shape({
        word: PropTypes.string.isRequired,
    })).isRequired,
    wordClass: PropTypes.string.isRequired,
};

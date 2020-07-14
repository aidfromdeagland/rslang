import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Words extends Component {
    render() {
        const { wordEng, wordRus } = this.props;
        return (
            <div className="words-container">
                <div className="words">
                    <p className="eng_word">{ wordEng }</p>
                    <p className="rus_word">{ wordRus }</p>
                </div>
            </div>
        );
    }
}

Words.propTypes = {
    wordRus: PropTypes.string,
    wordEng: PropTypes.string,
};

Words.defaultProps = {
    wordRus: '',
    wordEng: '',
};

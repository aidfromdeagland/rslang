import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as Constants from './constants';

export class Wordscore extends Component {
    render() {
        const { count, wordScore } = this.props;

        const classYes = Array(count).fill(1).map((item, index) => <div key={index} className="yes">&nbsp;</div>);
        const classEmpty = Array(Constants.MAX_ATTEMPT - count).fill(1).map((item, index) => <div key={index} className="empty">&nbsp;</div>);

        return (
            <div className="wordscore">
                <div className="yes_container">
                    { classYes }
                    { classEmpty }
                </div>
                <p>
                    <span>{ wordScore }</span>
                    <span>score for word</span>
                </p>
            </div>
        );
    }
}

Wordscore.propTypes = {
    count: PropTypes.number,
    wordScore: PropTypes.number,
};

Wordscore.defaultProps = {
    count: 0,
    wordScore: '',
};

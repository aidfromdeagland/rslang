import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './score.scss';

export class Score extends Component {
    render() {
        const { score } = this.props;
        return (
            <div className="score">
                <span>{ score }</span>
            </div>
        );
    }
}

Score.propTypes = {
    score: PropTypes.number,
};

Score.defaultProps = {
    score: 0,
};

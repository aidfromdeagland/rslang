import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class SavannahLives extends Component {
    render() {
        const { lives } = this.props;
        const livesArr = [];
        for (let i = 0; i < lives; i += 1) {
            livesArr.push(<div className="savannah__header-lives-life" key={i} />);
        }
        return (
            <div className="savannah__header-lives">
                { livesArr }
            </div>
        );
    }
}

SavannahLives.propTypes = {
    lives: PropTypes.number.isRequired,
};

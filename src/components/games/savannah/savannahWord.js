import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class SavannahWord extends Component {
    render() {
        const { word, id, onClick } = this.props;
        return (
            <div
                className="card__transition top"
                onClick={() => console.log(id)}
            >

                {word}
            </div>
        );
    }
}

SavannahWord.propTypes = {
    word: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

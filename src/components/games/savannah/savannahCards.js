import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class SavannahCards extends Component {
    render() {
        const {
            translateWords, word, getRightAnswer, getWrongAnswer, stopTimer, startTimer, toggleSelected, selected,
        } = this.props;
        return (
            <div className="savannah__cards">

                { translateWords.map((card, index) => (
                    <div
                        className={index === selected ? 'savannah__cards-card savannah__cards-card-success' : 'savannah__cards-card'}
                        aria-hidden
                        key={index}
                        onClick={() => {
                            toggleSelected(index);
                            stopTimer();
                            if (card.id === word.id) {
                                getRightAnswer();
                                startTimer();
                                toggleSelected(null);
                            } else {
                                getWrongAnswer();
                                startTimer();
                                toggleSelected(null);
                            }
                        }}

                    >
                        {`${index + 1}. ${card.translate}`}
                    </div>
                )) }
            </div>
        );
    }
}

SavannahCards.propTypes = {
    translateWords: PropTypes.arrayOf(PropTypes.shape({
        translate: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    })).isRequired,
    word: PropTypes.objectOf((PropTypes.string)).isRequired,
    getRightAnswer: PropTypes.func.isRequired,
    getWrongAnswer: PropTypes.func.isRequired,
    stopTimer: PropTypes.func.isRequired,
    startTimer: PropTypes.func.isRequired,
};

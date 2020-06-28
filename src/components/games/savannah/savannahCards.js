import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class SavannahCards extends Component {
    render() {
        const {
            translateWords, word, getRightAnswer, getWrongAnswer, getRightAnswersForStatistics, getWrongAnswersForStatistics,
        } = this.props;
        const cards = translateWords.sort(() => 0.5 - Math.random());

        return (
            <div className="savannah__cards">

                { cards.map((card, index) => (
                    <div
                        className="savannah__cards-card"
                        aria-hidden
                        key={index}
                        onClick={() => {
                            if (card.id === word.id) {
                                getRightAnswer();
                                getRightAnswersForStatistics(word.word, word.translate);
                            } else {
                                getWrongAnswer();
                                getWrongAnswersForStatistics(word.word, word.translate);
                            }
                        }}
                    >
                        {card.translate}
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
    word: PropTypes.objectOf(PropTypes.shape({
        word: PropTypes.string.isRequired,
        translate: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    })).isRequired,
    getRightAnswer: PropTypes.func.isRequired,
    getWrongAnswer: PropTypes.func.isRequired,
    getRightAnswersForStatistics: PropTypes.func.isRequired,
    getWrongAnswersForStatistics: PropTypes.func.isRequired,
};

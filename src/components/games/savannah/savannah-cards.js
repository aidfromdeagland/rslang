import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class SavannahCards extends Component {
    render() {
        const {
            translateWords, word, getRightAnswer, getWrongAnswer, stopTimer,
            startTimer, showRightCard, showWrongCard, getClassName, showRightWordByClick,
        } = this.props;
        return (
            <div className="savannah__cards">

                { translateWords.map((card, index) => (
                    <div
                        className={getClassName(index)}
                        aria-hidden
                        key={index}
                        onMouseDown={() => {
                            showRightWordByClick();
                            stopTimer();
                            if (card.id === word.id) {
                                showRightCard(index);
                                getRightAnswer();
                                startTimer();
                            } else {
                                showWrongCard(index);
                                getWrongAnswer();
                                startTimer();
                            }
                        }}
                        tabIndex="0"
                        role="button"
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
    showRightCard: PropTypes.func.isRequired,
    showWrongCard: PropTypes.func.isRequired,
    getClassName: PropTypes.func.isRequired,
    showRightWordByClick: PropTypes.func.isRequired,
};

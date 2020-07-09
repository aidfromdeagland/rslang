import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class InputContainer extends Component {
    render() {
        const {
            isCorrectWord, word, valueInput, checkWord, handleSubmit, handleChange,
        } = this.props;
        return (
            <span className="input-container">
                <span className={`background ${isCorrectWord ? 'correct' : ''}`}>
                    <span className="hidden">{word}</span>
                </span>
                <span className="word-container">
                    {isCorrectWord === false ? checkWord() : null}
                </span>
                <form className="answer-form" onSubmit={(e) => handleSubmit(e)}>
                    <input
                        className="answer-input"
                        type="text"
                        autoFocus={true}
                        value={valueInput}
                        onChange={(e) => handleChange(e)}
                    />
                </form>
            </span>
        );
    }
}

InputContainer.propTypes = {
    isCorrectWord: PropTypes.bool,
    word: PropTypes.string,
    valueInput: PropTypes.string,
    checkWord: PropTypes.func,
    handleSubmit: PropTypes.func,
    handleChange: PropTypes.func,
};

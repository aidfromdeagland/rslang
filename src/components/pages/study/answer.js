import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputContainer } from './inputContainer';
import { DifficultyEvaluation } from './difficulty-evaluation';

export class Answer extends Component {
    createContext = () => {
        const {
            isCorrectWord, valueInput, checkWord,
            handleSubmit, handleChange, contextAudio, wordAudio,
        } = this.props;
        const context = this.props.context.split(/(\s+)/);
        const total = context.map((word, index) => {
            if (word.toLowerCase().includes(this.props.word.toLowerCase())) {
                return (
                    <InputContainer
                        word={this.props.word}
                        wordAudio={wordAudio}
                        contextAudio={contextAudio}
                        checkWord={checkWord}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        valueInput={valueInput}
                        isCorrectWord={isCorrectWord}
                        key={index}
                    />
                );
            }
            if (word !== ' ') {
                return <span className="word" key={index}>{word}</span>;
            }
            return <span className="space" key={index}>  </span>;
        });
        return total;
    }

    render() {
        const {
            showEvaluation, handleEvaluate, currentWord, handleRepeatEvaluate,
        } = this.props;
        return (
            <div className="answer-container">
                {this.createContext()}
                {showEvaluation ? (
                    <DifficultyEvaluation
                        handleEvaluate={handleEvaluate}
                        handleRepeatEvaluate={handleRepeatEvaluate}
                        currentWord={currentWord}
                    />
                ) : null}
            </div>
        );
    }
}

Answer.propTypes = {
    isCorrectWord: PropTypes.bool,
    valueInput: PropTypes.string,
    checkWord: PropTypes.func,
    handleSubmit: PropTypes.func,
    handleChange: PropTypes.func,
    contextAudio: PropTypes.string,
    wordAudio: PropTypes.string,
};

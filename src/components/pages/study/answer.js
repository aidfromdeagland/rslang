import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputContainer } from './inputContainer';
import { DifficultyEvaluation } from './difficulty-evaluation';

export class Answer extends Component {
    createContext = () => {
        const {
            isCorrectWord, valueInput, checkWord, handleSubmit, handleChange, contextAudio, wordAudio,
        } = this.props;
        const context = this.props.context.split(/(\s+)/);
        const total = context.map((word, index) => {
            if (/<i>(.*?)<\/i>/.test(word) || /<b>(.*?)<\/b>/.test(word) || context.length === 1) {
                word.replace(/(\<(\/?[^>]+)>)/g, '');
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
            wordId, userWords, showEvaluation, handleEvaluate
        } = this.props;
        return (
            <div className="answer-container">
                {this.createContext()}
                {showEvaluation ? <DifficultyEvaluation wordId={wordId} userWords={userWords} handleEvaluate={handleEvaluate} /> : null}
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

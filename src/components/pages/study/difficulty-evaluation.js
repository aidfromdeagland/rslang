import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../shared/button';
import { WordService } from '../../../services/wordServices';
import { getMemoInfo } from '../../../services/spacedRepetition';
import './difficulty-evaluation.scss';

export class DifficultyEvaluation extends Component {
    constructor(props) {
        super(props);
    }

    handleCLick = (difficultyLevel) => {
        const { userWords, wordId, handleEvaluate} = this.props;
        let wordIndexInUserWords = -1;
        userWords.some((word, index) => {
            if (word.wordId === wordId) {
                wordIndexInUserWords = index;
            }
            return word.wordId === wordId;
        });

        if (wordIndexInUserWords !== -1) {
            console.log('have this word', userWords[wordIndexInUserWords]);
        } else {
            console.log('it is new word');
        }
        setTimeout(handleEvaluate, 0);
    }

    render() {
        return (
            <div className="difficulty-evaluation">
                <Button title="easy" className="difficulty-button difficulty-button_easy" onClick={() => { this.handleCLick(1); }} />
                <Button title="normal" className="difficulty-button difficulty-button_normal" onClick={() => { this.handleCLick(2); }} />
                <Button title="difficult" className="difficulty-button difficulty-button_difficult" onClick={() => { this.handleCLick(3); }} />
                <Button title="again" className="difficulty-button difficulty-button_again" onClick={() => { this.handleCLick(4); }} />
            </div>
        );
    }
}

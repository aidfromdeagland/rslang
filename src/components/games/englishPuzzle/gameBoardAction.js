import React, { Component } from 'react';
import './startPage.scss';
import './game-puzzle.scss';
import { DraggableWord } from './drogbleWord';

export class GameBoardAction extends Component {
    getWordsOfSentence = (sentence) => {
        const {
            showCheck,
            showButton,
            isClickedDontKnow,
        } = this.props;
        const words = sentence.split(' ').map((word, i) => {
            return (
                <DraggableWord
                    key={i}
                    word={word}
                    showCheck={showCheck}
                    showButton={showButton}
                    isClickedDontKnow={isClickedDontKnow}
                />
            );
        });
        return words;
    }

    getBlocksForContainer = (sentence) => {
        const blocks = sentence.split(' ').map((word, i) => {
            return <div className="puzzle-pieces_word-container"><div className="word-drop" key={i} /></div>;
        });
        return blocks;
    }

    render() {
        const { sentenceForPuzzle } = this.props;
        return (
            <div className="game-board__action">
                <div className="puzzle-container-sentence" />
                <div className="puzzle-pieces">
                    {this.getWordsOfSentence(sentenceForPuzzle)}
                </div>
            </div>
        );
    }
}

import React, { Component } from 'react';
import './startPage.scss';
import './game-puzzle.scss';
import { DraggableWord } from './drogbleWord';

export class GameBoardAction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            level: 1,
            page: 1,
            word: 1,
            isChecked: true,
            haveWords: false,
        };
    }

    getWordsOfSentence = (sentence) => {
        const words = sentence.split(' ').map((word, i) => <DraggableWord key={i} word={word} sentenceDoneHandle={this.props.sentenceDoneHandle} />);
        return words;
    }

    getBlocksForContainer = (sentence) => {
        const blocks = sentence.split(' ').map((word, i) => {
            return <div className="puzzle-pieces_word-container"><div className="word-drop" key={i} /></div>;
        });
        return blocks;
    }

    render() {
        return (
            <div className="game-board__action">
                <div className="puzzle-container-sentence" />
                <div className="puzzle-pieces">
                    {this.getWordsOfSentence(this.props.sentence)}
                </div>
            </div>
        );

    }
}

import React, { Component } from 'react';
import './startPage.scss';
import { Dropdown } from './dropDown/DropDown';
import { Checkbox } from './checkBox/checkBox';
import { WordService } from '../../../services/wordServices';
import { Spinner } from '../../shared/spinner';
import './game-puzzle.scss';

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
        const words = sentence.split(' ').map((word, i) => <div className="word-drag" key={i}><span className="word-text">{word}</span></div>);
        return words;
    }

    getBlocksForContainer = (sentence) => {
        const blocks = sentence.split(' ').map((word, i) => {
            const fill = this.props.black ? 'black' : 'white';
            return <div className="word-drag" key={i} style={{ backgroundColor: fill }}></div>;
        });
        return blocks;
    }


    render() {
        return (
            <div className="game-board__action">
                <div className="puzzle-container">
                    {this.getBlocksForContainer(this.props.sentence)}
                </div>
                <div className="puzzle-pieces">
                    {this.getWordsOfSentence(this.props.sentence)}
                </div>
            </div>
        );

    }
}

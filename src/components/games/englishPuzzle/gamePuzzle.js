import React, { Component } from 'react';
import './startPage.scss';
import { Dropdown } from './dropDown/DropDown';
import { Checkbox } from './checkBox/checkBox';
import { WordService } from '../../../services/wordServices';
import { Spinner } from '../../shared/spinner';
import './game-puzzle.scss';
import { GameBoardAction } from './gameBoardAction';
import { Button } from '../../shared/button';

export class GamePuzzle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            level: 1,
            page: 1,
            word: 2,
            isChecked: true,
            haveWords: false,
            isSentenceDone: false,
        };
    }

    componentDidMount() {
        if (!this.state.haveWords) {
            this.loadWords();
        }
    }

    loadWords = async () => {
        const {
            level,
            page,
            word,
        } = this.state;
        this.words = await WordService.getWords(level - 1, page - 1);
        const sentence = this.words[word].textExample.replace(/(<([^>]+)>)/g, '');
        this.sentenceForPuzzle = this.mixWords(sentence);
        this.translateSentence = this.words[word].textExampleTranslate;
        this.setState({ haveWords: true });
    }

    mixWords = (sentence) => {
        const newSentence = sentence.split(' ');
        // console.log(newSentence)
        const randomSentence = [];
        for (let i = newSentence.length - 1; i >= 0; i -= 1) {
            const randomIndex = this.randomInteger(0, i);
            randomSentence.push(newSentence[randomIndex]);
            newSentence.splice(randomIndex, 1);
        }
        return randomSentence.join(' ');
    }

    randomInteger = (min, max) => {
        const rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }

    sentenceDoneHandle = () => {
        this.setState((prev) => ({
            isSentenceDone: !prev.isSentenceDone,
        }));
    }

    render() {
        const { haveWords } = this.state;
        if (haveWords) {
            return (
                <div className="game-puzzle__container">
                    <div className="game-puzzle__header">
                        <Dropdown />
                        <Checkbox text="Auto pronunciation" />
                    </div>
                    <div className="game-board">
                        <div className="game-board__translation">
                            <span>{this.translateSentence}</span>
                        </div>
                        <GameBoardAction sentence={this.sentenceForPuzzle} sentenceDoneHandle={this.sentenceDoneHandle} />
                        <div className="game-board__btn-block">
                            {this.state.isSentenceDone && <Button className="check-sentence puzzle-btn button" title="Check" />}
                            <Button className="dont-know-sentence puzzle-btn button" title="Don\'t know" />
                            <Button className="continue-sentence puzzle-btn button" title="Continue" />
                            <Button className="puzzle-result puzzle-btn button" title="Results" />
                        </div>
                    </div>
                </div>
            );
        }
        return <Spinner />;
    }
}

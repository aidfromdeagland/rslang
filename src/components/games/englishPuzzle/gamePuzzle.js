import React, { Component } from 'react';
import './startPage.scss';
import { Dropdown } from './dropDown/DropDown';
import { Checkbox } from './checkBox/checkBox';
import { WordService } from '../../../services/wordServices';
import { Spinner } from '../../shared/spinner';
import './game-puzzle.scss';
import { GameBoardAction } from './gameBoardAction';
import { Button } from '../../shared/button';
import { ButtonsBlock } from './buttonsGame';

export class GamePuzzle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            level: 1,
            page: 2,
            wordCount: 0,
            isChecked: true,
            haveWords: false,
            isCheckBtn: false,
            isContinueBtn: false,
            isDontKnowBtn: true,
            isResultBtn: false,
            isClickedDontKnow: false,
        };
    }

    componentDidMount() {
        if (!this.state.haveWords) {
            this.loadWords();
        }
    }

    componentDidUpdate() {
        if (!this.state.haveWords) {
            this.loadWords();
        }
    }

    loadWords = async () => {
        const {
            level,
            page,
            wordCount,
        } = this.state;
        const calculatingPage = Math.floor((page - 1) / 2);
        const calculatingLevel = level - 1;
        const allWords = await WordService.getWords(calculatingLevel, calculatingPage);
        const wordsForGameRound = (page - 1) % 2 === 0 ? allWords.slice(0, 10) : allWords.slice(10, 19);
        this.sentence = wordsForGameRound[wordCount].textExample.replace(/(<([^>]+)>)/g, '');
        this.sentenceForPuzzle = this.mixWords(this.sentence);
        this.translateSentence = wordsForGameRound[wordCount].textExampleTranslate;
        this.setState({ haveWords: true });
    }

    mixWords = (sentence) => {
        const newSentence = sentence.split(' ');
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

    showButton = (name, boolean) => {
        this.setState({ [name]: boolean });
    }

    clickDontKnow = () => {
        this.setState({ isClickedDontKnow: true });
    }

    getNextWord = (count) => {
        this.setState({
            wordCount: count,
            haveWords: false,
        });
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
                        <GameBoardAction
                            sentenceForPuzzle={this.sentenceForPuzzle}
                            correctSentence={this.sentence}
                            showCheck={this.showCheck}
                            showButton={this.showButton}
                            isClickedDontKnow={this.state.isClickedDontKnow}
                        />
                        <ButtonsBlock
                            wordCount={this.state.wordCount}
                            isCheckBtn={this.state.isCheckBtn}
                            isContinueBtn={this.state.isContinueBtn}
                            isDontKnowBtn={this.state.isDontKnowBtn}
                            isResultBtn={this.state.isResultBtn}
                            correctSentence={this.sentence}
                            showButton={this.showButton}
                            getNextWord={this.getNextWord}
                            clickDontKnow={this.clickDontKnow}
                        />
                    </div>
                    <div className="progress-bar-game">
                        <div className="progress-percent-game" style={{ width: `${(this.state.wordCount + 1) * 10}%` }} />
                    </div>
                </div>
            );
        }
        return <Spinner />;
    }
}

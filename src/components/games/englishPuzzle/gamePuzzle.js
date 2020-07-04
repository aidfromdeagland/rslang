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
import { ModalResult } from './modalStatistics/modalResult';

export class GamePuzzle extends Component {
    constructor(props) {
        super(props);
        this.results = {
            know: [],
            dontKnow: [],
        };
        this.state = {
            level: 1,
            page: 1,
            wordCount: 0,
            haveWords: false,
            isCheckBtn: false,
            isContinueBtn: false,
            isDontKnowBtn: true,
            isResultBtn: false,
            isClickedDontKnow: false,
            isAutoPronunciation: true,
            isRoundEnd: false,
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
        this.allWords = await WordService.getWords(calculatingLevel, calculatingPage);
        this.createDataForGame(wordCount);
        // const wordsForGameRound = (page - 1) % 2 === 0 ? this.allWords.slice(0, 10) : this.allWords.slice(10, 20);
        // this.setState({
        //     sentence: wordsForGameRound[wordCount].textExample.replace(/(<([^>]+)>)/g, ''),
        //     sentenceForPuzzle: this.mixWords(this.sentence),
        //     translateSentence: wordsForGameRound[wordCount].textExampleTranslate,
        //     audioSentence: wordsForGameRound[wordCount].audioExample,
        // });
        // this.sentence = wordsForGameRound[wordCount].textExample.replace(/(<([^>]+)>)/g, '');
        // this.sentenceForPuzzle = this.mixWords(this.sentence);
        // this.translateSentence = wordsForGameRound[wordCount].textExampleTranslate;
        // this.audioSentence = wordsForGameRound[wordCount].audioExample;
        this.setState({ haveWords: true });
    }

    createDataForGame = (wordCount) => {
        const {
            level,
            page,
            // wordCount,
        } = this.state;
        const wordsForGameRound = (page - 1) % 2 === 0 ? this.allWords.slice(0, 10) : this.allWords.slice(10, 20);
        this.sentence = wordsForGameRound[wordCount].textExample.replace(/(<([^>]+)>)/g, '');
        this.sentenceForPuzzle = this.mixWords(this.sentence);
        this.translateSentence = wordsForGameRound[wordCount].textExampleTranslate;
        this.audioSentence = wordsForGameRound[wordCount].audioExample;
        this.setState({
            sentence: wordsForGameRound[wordCount].textExample.replace(/(<([^>]+)>)/g, ''),
            sentenceForPuzzle: this.mixWords(this.sentence),
            translateSentence: wordsForGameRound[wordCount].textExampleTranslate,
            audioSentence: wordsForGameRound[wordCount].audioExample,
        });
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
            // haveWords: false,
            isCheckBtn: false,
            isContinueBtn: false,
            isDontKnowBtn: true,
            isResultBtn: false,
        });
        this.createDataForGame(count);
    }

    selectLevel = (level, page) => {
        this.setState({
            level,
            page,
            haveWords: false,
            wordCount: 0,
            isCheckBtn: false,
            isContinueBtn: false,
            isDontKnowBtn: true,
            isResultBtn: false,
        });
    }

    checkBoxHandle = () => {
        this.setState((prev) => ({
            isAutoPronunciation: !prev.isAutoPronunciation,
        }));
    }

    addToResults = (result, sentence, audioUrl) => {
        this.results[result].push({ sentence, audioUrl });
    }

    showResults = () => {
        this.setState({ isRoundEnd: true });
    }

    handleByNextRound = () => {
        this.setState({ isRoundEnd: false });
        if (this.props.level === 6 && this.props.page === 60) {
            this.selectLevel(1, 1);
        }
        if (this.state.page < 60) {
            this.selectLevel(this.state.level, parseFloat(this.state.page) + 1);
        } else {
            this.selectLevel(this.state.level + 1, 1);
        }
        this.results.know = [];
        this.results.dontKnow = [];
    }

    render() {
        const {
            haveWords,
            sentence,
            sentenceForPuzzle,
            translateSentence,
            audioSentence,
        } = this.state;
        console.log(this.state)
        if (haveWords) {
            return (
                <div className="game-puzzle__container">
                    {this.state.isRoundEnd && <ModalResult results={this.results} handleByNextRound={this.handleByNextRound} />}
                    <div className="game-puzzle__header">
                        <Dropdown
                            selectLevel={this.selectLevel}
                            level={this.state.level}
                            page={this.state.page}
                        />
                        <Checkbox
                            text="Auto pronunciation"
                            checked={this.state.isAutoPronunciation}
                            checkBoxHandle={this.checkBoxHandle}
                        />
                    </div>
                    <div className="game-board">
                        <div className="game-board__translation">
                            <span>{translateSentence}</span>
                        </div>
                        <GameBoardAction
                            // sentenceForPuzzle={this.sentenceForPuzzle}
                            // correctSentence={this.sentence}
                            sentenceForPuzzle={sentenceForPuzzle}
                            correctSentence={sentence}

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
                            // correctSentence={this.sentence}
                            correctSentence={sentence}
                            showButton={this.showButton}
                            getNextWord={this.getNextWord}
                            clickDontKnow={this.clickDontKnow}
                            selectLevel={this.selectLevel}
                            level={this.state.level}
                            page={this.state.page}
                            // audioSentence={this.audioSentence}
                            audioSentence={audioSentence}
                            isAutoPronunciation={this.state.isAutoPronunciation}
                            addToResults={this.addToResults}
                            showResults={this.showResults}
                            isRoundEnd={this.state.isRoundEnd}
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

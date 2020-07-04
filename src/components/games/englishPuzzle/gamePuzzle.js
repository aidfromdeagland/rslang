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
            isPicture: false,
            isRoundEnd: false,
            isNext: true,
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
        if (!this.state.isNext) {
            this.createDataForGame(this.state.wordCount);
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
        if (this.props.isGameWithLevels) {
            this.allWords = await WordService.getWords(calculatingLevel, calculatingPage);
        }
        if (this.props.isGameWithUserWords) {
            this.allWords = await WordService.getUserWords();
            // this.allWords = this.getRandomData(userWords);
        }

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
        let wordsForGameRound;
        if (this.props.isGameWithLevels) {
            wordsForGameRound = (page - 1) % 2 === 0 ? this.allWords.slice(0, 10) : this.allWords.slice(10, 20);
        }
        if (this.props.isGameWithUserWords) {
            wordsForGameRound = this.getRandomData(this.allWords);
        }
        this.sentence = wordsForGameRound[wordCount].textExample.replace(/(<([^>]+)>)/g, '');
        this.sentenceForPuzzle = this.mixWords(this.sentence);
        this.translateSentence = wordsForGameRound[wordCount].textExampleTranslate;
        this.audioSentence = wordsForGameRound[wordCount].audioExample;
        this.image = wordsForGameRound[wordCount].image;
        this.setState({
            sentence: this.sentence,
            sentenceForPuzzle: this.sentenceForPuzzle,
            translateSentence: this.translateSentence,
            audioSentence: this.audioSentence,
            image: this.image,
            isNext: true,
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

    getRandomData = (data) => {
        const newData = data.slice();
        const randomData = [];
        for (let i = 0; i < 10; i += 1) {
            const randomIndex = this.randomInteger(0, newData.length);
            randomData.push(newData[randomIndex]);
            newData.splice(randomIndex, 1);
        }
        return randomData;
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
            isCheckBtn: false,
            isContinueBtn: false,
            isDontKnowBtn: true,
            isResultBtn: false,
            isNext: false,
        });
    }

    selectLevel = (level, page) => {
        if (this.props.isGameWithLevels) {
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
        if (this.props.isGameWithUserWords) {
            this.setState({
                wordCount: 0,
                isCheckBtn: false,
                isContinueBtn: false,
                isDontKnowBtn: true,
                isResultBtn: false,
                isNext: false,
            });
        }
        this.results.know = [];
        this.results.dontKnow = [];
    }

    checkBoxHandle = (prop) => {
        this.setState((prev) => ({
            [prop]: !prev[prop],
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
            isNext,
        } = this.state;
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
                            checkBoxHandle={() => this.checkBoxHandle('isAutoPronunciation')}
                        />
                        <Checkbox
                            text="Show Picture"
                            checked={this.state.isPicture}
                            checkBoxHandle={() => this.checkBoxHandle('isPicture')}
                        />
                    </div>
                    <div className="game-board">
                        {this.state.isPicture && (
                            <div className="image-container">
                                <img src={`https://raw.githubusercontent.com/aidfromdeagland/rslang-data/master/${this.state.image}`} alt="img" />
                            </div>
                        )}
                        <div className="game-board__translation">
                            <span>{translateSentence}</span>
                        </div>
                        {isNext ? (
                            <GameBoardAction
                                sentenceForPuzzle={sentenceForPuzzle}
                                correctSentence={sentence}
                                showCheck={this.showCheck}
                                showButton={this.showButton}
                                isClickedDontKnow={this.state.isClickedDontKnow}
                            />
                        ) : ''}
                        <ButtonsBlock
                            wordCount={this.state.wordCount}
                            isCheckBtn={this.state.isCheckBtn}
                            isContinueBtn={this.state.isContinueBtn}
                            isDontKnowBtn={this.state.isDontKnowBtn}
                            isResultBtn={this.state.isResultBtn}
                            correctSentence={sentence}
                            showButton={this.showButton}
                            getNextWord={this.getNextWord}
                            clickDontKnow={this.clickDontKnow}
                            selectLevel={this.selectLevel}
                            level={this.state.level}
                            page={this.state.page}
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

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
            word: 1,
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
        this.sentenceForPuzzle = this.words[word].textExample.replace(/(<([^>]+)>)/g, '');
        this.translateSentence = this.words[word].textExampleTranslate;
        this.setState({ haveWords: true });
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

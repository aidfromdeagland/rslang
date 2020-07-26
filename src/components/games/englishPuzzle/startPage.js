import React, { Component } from 'react';
import './startPage.scss';
import { GamePuzzle } from './gamePuzzle';
import { Button } from '../../shared/button';
import { WordService } from '../../../services/wordServices';
import { Spinner } from '../../shared/spinner';

export class StartPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isStart: false,
            isGameWithUserWords: false,
            isGameWithLevels: false,
            haveUserWords: false,
            isChecked: false,
        };
    }

    componentDidMount() {
        this.loadUserWords();
    }

    loadUserWords = async () => {
        const totalLearnedWordsQuery = { 'userWord.optional.isDeleted': false };
        const wordsResponse = await WordService.getUserAggWords('', totalLearnedWordsQuery, 3600);
        const userWords = wordsResponse[0].paginatedResults;
        if (userWords && userWords.length >= 9) {
            this.setState(() => ({ haveUserWords: true }));
        }
        this.setState({ isChecked: true });
    }

    handleClick = (modeGame) => {
        this.setState({
            isStart: true,
            [modeGame]: true,
        });
    }

    render() {
        const {
            isGameWithLevels,
            isGameWithUserWords,
            haveUserWords,
            isStart,
            isChecked,
        } = this.state;
        if (isStart) {
            return (
                <GamePuzzle
                    isGameWithLevels={isGameWithLevels}
                    isGameWithUserWords={isGameWithUserWords}
                />
            );
        }
        if (isChecked) {
            return (
                <div id="start-page">
                    <div className="title">english puzzle</div>
                    <div className="description">
                        <p>Click on words, collect phrases.</p>
                        <br />
                        <p>
                            Words can be drag and drop. Select difficulty levels in the menu.
                            {' '}
                            If you have already learned 10 or more words,
                            {' '}
                            you can use them in the game mode with learned words
                        </p>
                    </div>
                    <div className="start">
                        <Button
                            className="button btn-start"
                            onClick={() => this.handleClick('isGameWithLevels')}
                            title="Play by Levels"
                        />
                        <Button
                            className={haveUserWords ? 'button btn-start' : 'button btn-start disabled'}
                            onClick={() => this.handleClick('isGameWithUserWords')}
                            title="Play with learned words"
                            isDisabled={!haveUserWords}
                        />
                    </div>
                </div>
            );
        }
        return <Spinner />;
    }
}

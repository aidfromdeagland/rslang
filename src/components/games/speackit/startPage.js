import React, { Component } from 'react';
import './startPage.scss';
import { Button } from '../../shared/button';
import { WordService } from '../../../services/wordServices';
import { GameSpeakit } from './gameSpeakit';

export class StartPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isStart: false,
            isGameWithUserWords: false,
            isGameWithLevels: false,
            haveUserWords: false,
        };
    }

    componentDidMount() {
        const userWords = WordService.getUserWords();
        if (userWords && userWords.length >= 9) {
            this.setState(() => ({ haveUserWords: true }));
        }
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
        } = this.state;
        if (isStart) {
            return (
                <GameSpeakit
                    isGameWithLevels={isGameWithLevels}
                    isGameWithUserWords={isGameWithUserWords}
                />
            );
        }
        return (
            <div id="start-page">
                <div className="title">Speakit</div>
                <div className="description">
                    <p>Click on the words to hear their sound</p>
                    <br />
                    <p>Press the button and say the words to check your pronunciation</p>
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
                        title="Play with your words"
                        isDisabled={!haveUserWords}
                    />
                </div>
            </div>
        );
    }
}

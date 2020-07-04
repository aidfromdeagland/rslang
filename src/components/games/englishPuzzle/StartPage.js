import React, { Component } from 'react';
import './startPage.scss';
import { GamePuzzle } from './gamePuzzle';
import { Button } from '../../shared/button';

export class StartPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isStart: false,
            isGameWithUserWords: false,
            isGameWithLevels: false,
        };
    }

    handleClick = (modeGame) => {
        this.setState({
            isStart: true,
            [modeGame]: true,
        });
    }

    render() {
        if (this.state.isStart) {
            return <GamePuzzle isGameWithLevels={this.state.isGameWithLevels} isGameWithUserWords={this.state.isGameWithUserWords} />;
        }
        return (
            <div id="start-page">
                <div className="title">english puzzle</div>
                <div className="description"><p>Click on words, collect phrases.</p><br /><p>Words can be drag and drop. Select tooltips in the menu</p></div>
                <div className="start">
                    <Button className="button btn-start" onClick={() => this.handleClick('isGameWithLevels')} title="Play by Levels" />
                    <Button className="button btn-start" onClick={() => this.handleClick('isGameWithUserWords')} title="Play with your words" />
                </div>
            </div>
        );
    }
}

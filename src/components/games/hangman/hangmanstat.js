/* eslint-disable */
import React, { Component } from 'react';
import { Hangman } from './hangman';
import './hangmanstat.scss';

export class HangmanStat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isBack: false,
        };
        this.handleBack = this.handleBack.bind(this);
    }

    handleBack() {
        this.setState((State) => ({ isBack: true }));
        // this.setState({isBack: true});
        this.props.handleStatistics(false);
    }

    render() {
        const { wordStat } = this.props;
        const correctAnswers = Math.round((wordStat.trueLetters.length * 100) / (wordStat.trueLetters.length + wordStat.falseLetters.length));

        if (!this.state.isBack) {
            return (
                <div className="hangmanstat">
                    <h2>Statistics</h2>
                    <div className="stat">
                        <div className="stat-current">
                            <h3>Current game</h3>
                            <div>
                                Correct answers:
                                {correctAnswers}
                                %
                            </div>
                            <div>
                                Number of moves:
                                {wordStat.countMoves}
                            </div>
                            <div>
                                Guesssed letters:
                                {wordStat.trueLetters}
                            </div>
                            <div>
                                Invalid letters:
                                {wordStat.falseLetters}
                            </div>
                        </div>
                        <div className="stat-history">
                            <h3>History</h3>
                        </div>
                    </div>
                    {/* <Button className='btn-back'
                        onClick={this.handleBack}
                        >New game
                    </Button> */}
                </div>
            );
        }
        return (
            <Hangman />
        );
    }
}

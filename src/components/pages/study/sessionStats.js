/* eslint-disable max-len */
import React, { Component } from 'react';
import { Button } from '../../shared/button';
import './sessionStats.scss';

export class SessionStats extends Component {
    defineColorModificator = (relativeValue) => {
        if (relativeValue < 0.5) {
            return 'color-modificator_error';
        }
        if (relativeValue < 0.75) {
            return 'color-modificator_warning';
        }
        return 'color-modificator_success';
    }

    render() {
        const { data, okClickHandler } = this.props;
        const learnedCardsToInitialCardsRatio = data.cardsLearned / data.initialCards;
        const newLearnedToInitialNewRatio = data.newWords / data.initialNewWords;
        const correctToTotalRatio = data.correctAnswers / (data.correctAnswers + data.incorrectAnswers);
        const streakLengthToTotalRatio = (data.longestStreak / (data.correctAnswers + data.incorrectAnswers)) * 2;
        return (
            <div className="study-stats">
                <h2 className="study-stats__heading">COMPLETED!</h2>
                <table className="study-stats__table">
                    <tbody>
                        <tr>
                            <td className="study-stats__label">cards learned</td>
                            <td className={`study-stats__data ${this.defineColorModificator(learnedCardsToInitialCardsRatio)}`}>{data.cardsLearned}</td>
                        </tr>
                        <tr>
                            <td className="study-stats__label">correct answers</td>
                            <td className={`study-stats__data ${this.defineColorModificator(correctToTotalRatio)}`}>
                                {`${Math.round(correctToTotalRatio * 100) || '0'}%`}
                            </td>
                        </tr>
                        <tr>
                            <td className="study-stats__label">new words learned</td>
                            <td className={`study-stats__data ${this.defineColorModificator(newLearnedToInitialNewRatio)}`}>{data.newWords}</td>
                        </tr>
                        <tr>
                            <td className="study-stats__label">longest streak</td>
                            <td className={`study-stats__data ${this.defineColorModificator(streakLengthToTotalRatio)}`}>{data.longestStreak}</td>
                        </tr>
                    </tbody>
                </table>
                <Button className="study-stats__button" title="OK" onClick={okClickHandler} />
            </div>
        );
    }
}

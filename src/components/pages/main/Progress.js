import React, { Component } from 'react';
import './main.scss';
import starImg from '../../../assets/icons/star.svg';

export class Progress extends Component {
    constructor(props) {
        super(props);
        this.progressForExample = {
            choseToStudy: 30,
            learnedToday: 10,
            needLearn: 20,
            allLearnedWords: 189
        };
        this.state = {
            learnedPercent: this.calculatePercentageWords(this.progressForExample.choseToStudy, this.progressForExample.learnedToday),
            needLearnPercent: this.calculatePercentageWords(this.progressForExample.choseToStudy, this.progressForExample.needLearn),
            allLearnedWords: this.progressForExample.allLearnedWords
        };
    }

    calculatePercentageWords = (allWord, words) => {
        return words * 100 / allWord;
    }

    render() {
        return (
            <div className="main-page_progress-container">
                <div className="progress-container_progress">
                    <h2>Progress</h2>
                    <div className="learned-words">
                        <div className="text">
                            Words you learned today:
                            <em>10</em>
                        </div>
                        <div className="progress-bar progress-bar_learned">
                            <div className="progress-percent" style={{ width: `${this.state.learnedPercent}%` }} />
                        </div>
                    </div>
                    <div className="need-words">
                        <div className="text">
                            Words you need to learn:
                            <em>10</em>
                        </div>
                        <div className="progress-bar progress-bar_need-learn">
                            <div className="progress-percent" style={{ width: `${this.state.needLearnPercent}%` }} />
                        </div>
                    </div>
                    <div className="all-learned-words">
                        All words you learned:
                        <em>{this.state.allLearnedWords}</em>
                    </div>
                </div>
                <div className="progress-container_level">
                    <h2>Level</h2>
                    <div className="level-rank">Master</div>
                    <div className="stars-container">
                        <img src={starImg} alt="starImg" />
                        <img src={starImg} alt="starImg" />
                        <img src={starImg} alt="starImg" />
                    </div>
                </div>
            </div>
        );
    }
}

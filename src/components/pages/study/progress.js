import React, { Component } from 'react';
import './progress.scss';
import { Spinner } from '../../shared/spinner';
import { WordService } from '../../../services/wordServices';

export class Progress extends Component {
    render() {
        const {
            learnedWordsQuantity, needToLearnWordsQuantity, totalLearnedWordsQuantity,
        } = this.props;
        return (
            <div className="progress-container">
                <div className="progress-container_progress">
                    <div className="learned-words">
                        <div className="text">
                            Words you learned today:
                            {` ${learnedWordsQuantity} / ${needToLearnWordsQuantity}`}
                        </div>
                        <div className="progress-bar progress-bar_learned">
                            <div className="progress-percent" style={{ width: `calc(${learnedWordsQuantity} / ${needToLearnWordsQuantity})%` }} />
                        </div>
                    </div>
                    <div className="all-learned-words">
                        All words you learned:
                        {totalLearnedWordsQuantity}
                    </div>
                </div>
            </div>
        );
    }
}

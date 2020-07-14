import React, { Component } from 'react';
import './progress.scss';

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
                            training progress:
                            {` ${learnedWordsQuantity} / ${needToLearnWordsQuantity}`}
                        </div>
                        <div className="progress-bar progress-bar_learned">
                            <div className="progress-percent" style={{ width: `calc(${learnedWordsQuantity} / ${needToLearnWordsQuantity} * 100%)` }} />
                        </div>
                    </div>
                    <div className="all-learned-words">
                        total words learned:
                        {` ${totalLearnedWordsQuantity}`}
                    </div>
                </div>
            </div>
        );
    }
}

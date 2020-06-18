import React, { Component } from 'react';
import './main.scss';

export class Progress extends Component {
    render() {
        return (
            <div className="main-page_progress-container">
                <div className="progress-container_progress">
                    <h2>Progress</h2>
                    <div className="learned-words">
                        <div className="text">Words you learned today: <em>10</em></div>
                        <div className="progress-bar progress-bar_learned">
                            <div className="primary" style={{width: 0 + '%'}}></div>
                            <div className="secondary" style={{width: 0 + '%'}}></div>
                        </div>
                    </div>
                    <div className="need-words">
                        <div className="text">Words you need to learn: <em>10</em></div>
                        <div className="progress-bar progress-bar_need-learn">
                            <div className="primary" style={{width: 0 + '%'}}></div>
                            <div className="secondary" style={{width: 0 + '%'}}></div>
                        </div>
                    </div>
                    <div className="all-learned-words">All words you learned: <em>20</em></div>
                </div>
                <div className="progress-container_level">
                    <h2>Level</h2>
                    <div className="level-rank">Master</div>
                    <div className="stars-container"></div>
                </div>
            </div>
        );
    }
}

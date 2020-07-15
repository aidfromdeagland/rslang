import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Main } from '../../pages/main/main';
import { SprintStart } from './sprintstart';
import { ResultsTable } from './resultstable';
import { StatisticService } from '../../../services/statisticServices';

export class Results extends Component {
        constructor(props) {
        super(props);
        this.state = {
            isRepeat: false,
            isMain: false,
        };
    }

    handleNo() {
        this.setState({
            isMain: true,
        });
    }

    handleYes() {
        this.setState({
            isRepeat: true,
        });      
    }
    
    render() {
        const { score, wrongAnswers, correctAnswers, results, percent } = this.props;
        if(this.state.isRepeat) {
            return (
                <SprintStart />
            );        
        }
        if(this.state.isMain) {
            return (
                <Main />
            );        
        }
       
        return (
            <div className="sprint">
                <div className="result">
                    <h3>Your current result is</h3>
                    <p className="result_score">{ score }</p>
                    <p className="errors">Right answers: {correctAnswers}</p>
                    <p className="errors">Wrong answers: {wrongAnswers}</p>
                    <p className="percent">This result is in the top {percent}%.</p>
                    <ResultsTable results={results} />
                    <p className="question">Do you want to play this game again?</p>
                    <div className="buttons">
                        <button type="button" id ="btn_no" 
                          onClick={this.handleNo.bind(this)}>No</button>
                        <button type="button" id ="btn_yes" 
                          onClick={this.handleYes.bind(this)}>Yes</button>
                    </div>
                </div>
            </div>      
        );
    }
}

Results.propTypes = {
    score: PropTypes.number,
};

Results.defaultProps = {
    score: 0,
};

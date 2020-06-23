import React, { Component } from 'react';
import { Chart } from './chart';
import './stats.scss';

export class Stats extends Component {
    render() {
        return (
            <div className="statistic">
                <button className="statisticBtn">Details</button>
                <Chart />
            </div>
        );
    }
}

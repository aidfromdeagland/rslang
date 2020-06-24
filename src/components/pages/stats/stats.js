import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '../../shared/button';
import { Chart } from './chart';

import './stats.scss';

export class Stats extends Component {
    render() {
        return (
            <div className="statistic">
                <div>
                    <NavLink to="/stats/table">
                        <Button className="statistic__btn" title="Details" />
                    </NavLink>
                </div>

                <Chart />
            </div>
        );
    }
}

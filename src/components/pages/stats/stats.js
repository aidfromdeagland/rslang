import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '../../shared/button';
import { Chart } from './chart';

import './stats.scss';

export class Stats extends Component {
    render() {
        return (
            <div className="stats">
                <NavLink className="stats__link" to="/stats/table">
                    <Button className="stats__btn" title="Details" />
                </NavLink>
                <Chart />
            </div>
        );
    }
}

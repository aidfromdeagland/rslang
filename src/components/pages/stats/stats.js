import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../shared/button';
import { Chart } from './chart';

import './stats.scss';

export class Stats extends Component {
    render() {
        return (
            <div className="statistic">
                <div>
                    <Link to="notFound/table">
                        <Button className="statistic__btn" title="Details" />
                    </Link>
                </div>

                <Chart />
            </div>
        );
    }
}

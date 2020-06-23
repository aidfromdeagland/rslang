import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import './stats.scss';

export class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            charData: {
                labels: ['600', '1200', '1800', '2400', '3000', '3600'],
                datasets: [
                    {
                        label: 'ammount words you learn',
                        data: [
                            2,
                            10,
                            40,
                            45,
                            45,
                            50,
                        ],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                        ],
                        pointRadius: 1,
                    },
                ],

            },
        };
    }

    render() {
        return (
            <div className="chart">
                <Line
                    data={this.state.charData}
                    options={{
                        title: {
                            display: true,
                            text: 'Look at your progress!',
                            fontSize: 25,
                        },
                        legend: {
                            display: true,
                            position: 'bottom',
                        },
                        height: 1500,

                    }}

                />

            </div>
        );
    }
}

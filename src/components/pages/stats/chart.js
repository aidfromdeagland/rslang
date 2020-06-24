import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import './stats.scss';

export class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {

            charData: {
                datasets: [
                    {
                        label: 'amount words you learned',
                        data: [{
                            x: 0,
                            y: 0,
                        }, {
                            x: 100,
                            y: 3,
                        }, {
                            x: 1000,
                            y: 27,
                        }, {
                            x: 3000,
                            y: 83,
                        }],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                        ],
                        pointRadius: 3,

                    },
                ],
            },
            amount: null,
        };
    }

    render() {
        const { charData, amount } = this.state;

        return (
            <div className="chart">
                <Line

                    data={charData}
                    options={{
                        title: {
                            display: true,
                            text: 'Look at your progress!',
                            fontSize: 25,
                            fontColor: '#092C70',
                            padding: 25,
                        },
                        legend: {
                            display: true,
                            position: 'bottom',
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    max: 100,
                                    min: 0,
                                    stepSize: 10,
                                },
                            }],
                            xAxes: [{
                                type: 'linear',
                                ticks: {
                                    max: 3600,
                                    min: 0,
                                    stepSize: 300,
                                },
                            }],
                        },
                        tooltips: {
                            xLabel: null,
                            callbacks: {
                                afterLabel: () => {
                                    const option = {
                                        day: 'numeric',
                                        month: 'long',
                                    };
                                    return new Date().toLocaleString('en-US', option);
                                },
                                label: () => (`words a day: ${amount}`),
                                title: () => null,
                                labelColor: () => ({

                                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                                }),

                            },
                        },

                    }}

                />

            </div>
        );
    }
}

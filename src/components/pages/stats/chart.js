import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import './stats.scss';
import { StatisticService } from '../../../services/statisticServices';

export class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {

            charData: {
                datasets: [
                    {
                        label: 'amount words you learned',
                        data: [{
                            x: 1594507855256,
                            y: 10,
                        }, {
                            x: 1594590257821,
                            y: 30,
                        },
                        {
                            x: 1594690257821,
                            y: 45,
                        },
                        ],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                        ],
                        pointRadius: 3,
                    },
                ],
            },
        };
    }

    componentDidMount() {
        this.loadDatatoGraph();
    }

     loadDatatoGraph = async () => {
         const res = await StatisticService.get();
         console.log(res);
     }

     render() {
         const { charData } = this.state;

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

                             xAxes: [{
                                 type: 'time',
                                 time: {
                                     unit: 'day',
                                     // unitStepSize: 0.5,
                                     // round: 'hour',
                                     tooltipFormat: 'MMM D',
                                     displayFormats: {
                                         hour: 'MMM D',
                                     },
                                 },
                                 gridLines: {
                                     display: false,
                                 },
                             }],
                         },
                     }}

                 />

             </div>
         );
     }
}

import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import './stats.scss';
import { WordService } from '../../../services/wordServices';

export class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {

            charData: {
                labels: [],
                datasets: [
                    {
                        label: 'amount words you learned',
                        data: [],
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
         const wordObject = await this.getWordsForDay();
         const { length } = Object.keys(wordObject);
         const amountOfWords = [];
         const labelsTime = [];
         let sumPrevWords = 0;
         for (let i = 0; i < length; i += 1) {
             sumPrevWords += Object.values(wordObject)[i];
             amountOfWords.push(
                 sumPrevWords,
             );

             labelsTime.push(
                 Object.keys(wordObject)[i],
             );
         }

         this.setState({
             charData: {
                 labels: labelsTime,
                 datasets: [
                     {
                         label: 'amount words you learned',
                         data: amountOfWords,
                     },
                 ],
             },
         });
         console.log(Object.values(wordObject));
     }

     getWordsForDay = async () => {
         const arr = [];
         const userWord = await WordService.getUserWords();
         for (let i = 0; i < userWord.length; i += 1) {
             const date = new Date(userWord[i].optional.debutDate);
             const options = {
                 day: 'numeric',
                 month: 'long',
                 hour: 'numeric',
                 minute: 'numeric',
                 hour12: false,
             };
             const dateFormat = date.toLocaleString('en', options);
             arr.push(dateFormat);
         }
         const result = arr.reduce((acc, el) => {
             acc[el] = (acc[el] || 0) + 1;
             return acc;
         }, {});
         return result;
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
                     }}

                 />

             </div>
         );
     }
}

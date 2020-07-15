import React, { Component } from 'react';
import { WordService } from '../../../services/wordServices';
import { totalLearnedWordsQuery } from '../../../constants/globalConstants';

const Row = ({ maxNew, difficult, total }) => (
    <div className="row">
        <div>{maxNew}</div>
        <div>{difficult}</div>
        <div>{total}</div>
    </div>
);
export class TableMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        this.loadDatatoStatistic();
    }

    loadDatatoStatistic = async () => {
        const data = await WordService.getUserAggWords('', totalLearnedWordsQuery, 3600);
        const userWord = data[0].paginatedResults;
        const difficultWords = await this.getDifficultWords();
        const maxNewWords = await this.getMaxNewWords();

        this.setState({
            data: [
                {
                    maxNew: maxNewWords, difficult: difficultWords, total: userWord.length,
                },

            ],
        });
    }

        getWordsForDay = async () => {
            const arr = [];
            const userWord = await WordService.getUserWords();
            for (let i = 0; i < userWord.length; i += 1) {
                const date = new Date(userWord[i].optional.debutDate);
                const options = {
                    day: 'numeric',
                    month: 'long',
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

    getMaxNewWords = async () => {
        const words = await this.getWordsForDay();
        const max = (Object.values(words));
        return Math.max(...max);
    }

    getDifficultWords = async () => {
        const allDifWords = [];
        const userWord = await WordService.getUserWords();
        for (let i = 0; i < userWord.length; i += 1) {
            if (userWord[i].optional.isDifficult) {
                allDifWords.push(userWord[i]);
            }
        }
        return allDifWords.length;
    }

    render() {
        const { data } = this.state;
        const rows = data.map((rowData, index) => (
            <Row
                key={index}
                {...rowData}
            />
        ));

        return (
            <div className="table">
                <div className="table__header">
                    <div>Max new words a day</div>
                    <div>Difficult words</div>
                    <div>Total words you learned!</div>

                </div>
                <div className="body">
                    {rows}
                </div>
            </div>
        );
    }
}

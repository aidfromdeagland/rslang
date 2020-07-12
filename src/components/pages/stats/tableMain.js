import React, { Component, useReducer } from 'react';
import PropTypes from 'prop-types';
import { WordService } from '../../../services/wordServices';

const Row = ({ maxNew, maxRight, total }) => (
    <div className="row">
        <div>{maxNew}</div>
        <div>{maxRight}</div>
        <div>{total}</div>
    </div>
);
export class TableMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    maxNew: null, difficult: null, total: null,
                },

            ],
        };
    }

    componentDidMount() {
        this.loadDatatoStatistic();
        this.getDifficultWords();
    }

    loadDatatoStatistic = async () => {
        const userWord = await WordService.getUserWords();
        const maxNewWords = await this.getMaxNewWords();
        const difficultWords = await this.getDifficultWords();
        this.setState({
            data: [
                {
                    maxNew: maxNewWords, difficult: difficultWords, total: userWord.length,
                },

            ],
        });
        console.log(userWord);
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
            console.log(result);
            return result;
        }

    getMaxNewWords = async () => {
        const words = await this.getWordsForDay();
        const max = Math.max(Object.values(words));
        return max;
    }

    getDifficultWords = async () => {
        const arr = [];
        const userWord = await WordService.getUserWords();
        for (let i = 0; i < userWord.length; i += 1) {
            if (userWord[i].optional.isDifficult) {
                arr.push(userWord[i]);
            }
        }
        console.log(arr);
        return arr.length;
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

TableMain.propTypes = {
    maxNew: PropTypes.number.isRequired,
    maxRight: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
};

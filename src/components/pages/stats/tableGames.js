import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatisticService } from '../../../services/statisticServices';

const Row = ({
    game, date, win, lose, score,
}) => (
    <div className="row">
        <div>{game}</div>
        <div>{date}</div>
        <div>{win}</div>
        <div>{lose}</div>
        <div>{score}</div>

    </div>
);
export class TableGames extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    game: 'SpeakIt', date: null, win: null, lose: null, score: null,
                },
                {
                    game: 'English Puzzle', date: null, win: null, lose: null, score: null,
                },
                {
                    game: 'Savannh', date: null, win: null, lose: null, score: null,
                },
                {
                    game: 'Audio Call', date: null, win: null, lose: null, score: null,
                },
                {
                    game: 'Sprint', date: null, win: null, lose: null, score: null,
                },
                {
                    game: 'Hangman', date: null, win: null, lose: null, score: null,
                },

            ],
        };
    }

    componentDidMount() {
        this.loadStatistics();
    }

     loadStatistics = async () => {
         const data = await StatisticService.get();
         const dataGame = data.optional;
         const dataSavanna = JSON.parse(dataGame.savannah);
         // const dataGamePuzzle = JSON.parse(settings.gamePuzzle);

         this.setState({
             data: [
                 {
                     game: 'SpeakIt', date: null, win: null, lose: null, score: null,
                 },
                 {
                     game: 'English Puzzle', date: null, win: null, lose: null, score: null,
                 },
                 {
                     game: 'Savannah', date: this.getTimeFormat(dataSavanna.date), win: dataSavanna.correct, lose: dataSavanna.incorrect, score: null,
                 },
                 {
                     game: 'Audio Call', date: null, win: null, lose: null, score: null,
                 },
                 {
                     game: 'Sprint', date: null, win: null, lose: null, score: null,
                 },
                 {
                     game: 'Hangman', date: null, win: null, lose: null, score: null,
                 },

             ],
         });
         console.log((JSON.parse(dataGame.savannah)));
         console.log(data);
     }

     getTimeFormat = (timestamp) => {
         const options = {
             day: 'numeric',
             month: 'long',
             hour: 'numeric',
             minute: 'numeric',
             second: 'numeric',
             hour12: false,
         };
         const date = new Date(timestamp);
         const dateFormat = date.toLocaleString('en', options);
         return dateFormat;
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
                     <div>Game</div>
                     <div>Last Game</div>
                     <div>Correct Answers</div>
                     <div>Wrong Answers</div>
                     <div>Score</div>

                 </div>
                 <div className="body">
                     {rows}
                 </div>
             </div>
         );
     }
}

TableGames.propTypes = {
    game: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    win: PropTypes.number.isRequired,
    lose: PropTypes.number.isRequired,
    score: PropTypes.number,
};

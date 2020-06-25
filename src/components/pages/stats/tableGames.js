import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Row = ({
    game, total, win, lose, success,
}) => (
    <div className="row">
        <div>{game}</div>
        <div>{total}</div>
        <div>{win}</div>
        <div>{lose}</div>
        <div>{success}</div>

    </div>
);
export class TableGames extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    game: 'SpeakIt', total: null, win: null, lose: null, success: null,
                },
                {
                    game: 'English Puzzle', total: null, win: null, lose: null, success: null,
                },
                {
                    game: 'Savannh', total: null, win: null, lose: null, success: null,
                },
                {
                    game: 'Audio Call', total: null, win: null, lose: null, success: null,
                },
                {
                    game: 'Sprint', total: null, win: null, lose: null, success: null,
                },
                {
                    game: 'Hangman', total: null, win: null, lose: null, success: null,
                },

            ],
        };
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
                    <div>Rounds</div>
                    <div>Win</div>
                    <div>Lose</div>
                    <div>% success</div>

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
    total: PropTypes.number.isRequired,
    win: PropTypes.number.isRequired,
    lose: PropTypes.number.isRequired,
    success: PropTypes.number.isRequired,
};

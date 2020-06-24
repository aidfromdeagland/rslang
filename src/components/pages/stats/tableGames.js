import React, { Component } from 'react';

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
                    game: 'SpeakIt', total: '', win: '', lose: '', success: '',
                },
                {
                    game: 'English Puzzle', total: '', win: '', lose: '', success: '',
                },
                {
                    game: 'Savannh', total: '', win: '', lose: '', success: '',
                },
                {
                    game: 'Audio Call', total: '', win: '', lose: '', success: '',
                },
                {
                    game: 'Sprint', total: '', win: '', lose: '', success: '',
                },
                {
                    game: 'Hangman', total: '', win: '', lose: '', success: '',
                },

            ],
        };
    }

    render() {
        const { data } = this.state;
        const rows = data.map((rowData) => <Row {...rowData} />);

        return (

            <div className="table">
                <h1>Statistics of mini-games</h1>
                <div className="header">
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

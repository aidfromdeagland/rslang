import React, { Component } from 'react';
import { TableSpeakit } from './tableSpeakit';
import { TablePuzzle } from './tablePuzzle';
import { TableSavannah } from './tableSavannah';
import { TableAudiocall } from './tableAudiocall';
import { TableSprint } from './tableSprint';
import { TableHangman } from './tableHangman';

export class TableGames extends Component {
    loadStatistics = (game) => {
        const amountsOfround = game.length;
        const data = [];
        for (let i = 0; i < amountsOfround; i += 1) {
            const percent = (Math.round((game[i].Correct * 100) / (game[i].Correct + game[i].Incorrect)));
            // eslint-disable-next-line no-restricted-globals
            const resSuccess = isNaN(percent) ? '' : percent;
            data.push(
                {
                    date: this.getTimeFormat(game[i].Date),
                    win: game[i].Correct,
                    lose: game[i].Incorrect,
                    success: resSuccess,
                },
            );
        }
        return data;
    }

    // eslint-disable-next-line consistent-return
    getTimeFormat = (timestamp) => {
        const options = {
            day: 'numeric',
            month: 'long',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
        };
        if (timestamp !== null) {
            const date = new Date(timestamp);
            const dateFormat = date.toLocaleString('en', options);
            return dateFormat;
        }
    }

    render() {
        return (
            <div className="tables__minigames">
                <h2>SpeakIt</h2>
                <TableSpeakit
                    loadStatistics={this.loadStatistics}
                />
                <h2>English-puzzle</h2>
                <TablePuzzle
                    loadStatistics={this.loadStatistics}
                />
                <h2>Savannah</h2>
                <TableSavannah
                    loadStatistics={this.loadStatistics}
                />
                <h2>Audio call</h2>
                <TableAudiocall
                    loadStatistics={this.loadStatistics}
                />
                <h2>Sprint</h2>
                <TableSprint
                    loadStatistics={this.loadStatistics}
                />
                <h2>Hangman</h2>
                <TableHangman
                    loadStatistics={this.loadStatistics}
                />
            </div>
        );
    }
}

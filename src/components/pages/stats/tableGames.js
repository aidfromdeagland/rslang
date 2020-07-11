import React, { Component } from 'react';
import { TableSpeakit } from './tableSpeakit';
import { TablePuzzle } from './tablePuzzle';
import { TableSavannah } from './tableSavannah';
import { TableAudiocall } from './tableAudiocall';
import { TableSprint } from './tableSprint';
import { TableHangman } from './tableHangman';
import { StatisticService } from '../../../services/statisticServices';

export class TableGames extends Component {
    loadStatistics = (game) => {
        const amountsOfround = game.length;
        const data = [];
        for (let i = 0; i < amountsOfround; i += 1) {
            data.push(
                {
                    date: this.getTimeFormat(game[i].date),
                    win: game[i].correct,
                    lose: game[i].incorrect,
                    success: ((game[i].correct * 100) / (game[i].correct + game[i].incorrect)),
                },
            );
        }
        return data;
    }

    getTimeFormat = (timestamp) => {
        const options = {
            day: 'numeric',
            month: 'long',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
        };
        const date = new Date(timestamp);
        const dateFormat = date.toLocaleString('en', options);
        return dateFormat;
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

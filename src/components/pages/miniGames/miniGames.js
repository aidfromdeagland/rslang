import React, { Component } from 'react';
import './miniGames.scss';
import { GameList } from './gameList';

export class MiniGames extends Component {
    render() {
        return (
            <div className="mini-games">
                <h1>Mini games</h1>
                <GameList />
            </div>
        );
    }
}

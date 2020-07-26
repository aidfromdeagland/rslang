import React, { Component } from 'react';
import dataGames from './dataGames';
import { Game } from './game';
import './miniGames.scss';

export class GameList extends Component {
    render() {
        return (
            <div className="games-catalog">
                { dataGames.map((game, index) => (
                    <Game
                        data={game}
                        key={index}
                    />
                )) }
            </div>
        );
    }
}

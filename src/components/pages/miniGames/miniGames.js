import React, { Component } from 'react';
import './miniGames.scss';
import { GameList } from './GameList';
// import {
//     BrowserRouter as Router, Route, Switch,
//   } from 'react-router-dom';

export class MiniGames extends Component {
    render() {
        return (
            <div className="mini-games">
                <h1>Mini games</h1>
                {/* <Switch>
                    <Route path="/mini-games/speakit">
                        <div>dsdsdsdsdsds</div>
                    </Route>
                    <Route path="/mini-games/english-puzzle">
                        <div>dsdsdsdsdsds</div>
                    </Route>
                    <Route path="/mini-games/savannah">
                        <div>dsdsdsdsdsds</div>
                    </Route>
                    <Route path="/mini-games/audio-call">
                        <div>dsdsdsdsdsds</div>
                    </Route>
                    <Route path="/mini-games/sprint">
                        <div>dsdsdsdsdsds</div>
                    </Route>
                    <Route path="/mini-games/hangman">
                        <div>dsdsdsdsdsds</div>
                    </Route>
                </Switch> */}
                <GameList />
            </div>
        );
    }
}

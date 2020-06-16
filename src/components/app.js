import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './app.scss';
import {
    BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import { Nav } from './nav/nav';
import { AboutTeam } from './pages/aboutTeam/aboutTeam';
import { Auth } from './pages/auth/auth';
import { Main } from './pages/main/main';
import { MiniGames } from './pages/miniGames/miniGames';
import { Promo } from './pages/promo/promo';
import { Stats } from './pages/stats/stats';
import { Vocabulary } from './pages/vocabulary/vocabulary';
import { NotFound } from './pages/notFound/notFound';
import { SpeakIt } from './games/speackit/SpeakIt';
import { EnglishPuzzle } from './games/englishPuzzle/EnglishPuzzle';
import { Savannah } from './games/savannah/Savannah';
import { AudioCall } from './games/audioCall/AudioCall';
import { Sprint } from './games/sprint/Sprint';
import { Hangman } from './games/hangman/Hangman';




export class App extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <header>
                        <Nav />
                    </header>
                    <main>
                        <Switch>
                            <Route path="/auth">
                                <Auth />
                            </Route>
                            <Route exact path="/mini-games">
                                <MiniGames />
                            </Route>
                            <Route path="/mini-games/speakit">
                                <SpeakIt />
                            </Route>
                            <Route path="/mini-games/english-puzzle">
                                <EnglishPuzzle />
                            </Route>
                            <Route path="/mini-games/savannah">
                                <Savannah />
                            </Route>
                            <Route path="/mini-games/audio-call">
                                <AudioCall />
                            </Route>
                            <Route path="/mini-games/sprint">
                                <Sprint />
                            </Route>
                            <Route path="/mini-games/hangman">
                                <Hangman />
                            </Route>
                            <Route path="/main">
                                <Main />
                            </Route>
                            <Route path="/stats">
                                <Stats />
                            </Route>
                            <Route path="/vocabulary">
                                <Vocabulary />
                            </Route>
                            <Route path="/about-team">
                                <AboutTeam />
                            </Route>
                            <Route exact path="/">
                                <Promo />
                            </Route>
                            <Route path="/*">
                                <NotFound />
                            </Route>
                        </Switch>
                    </main>
                </div>
            </Router>
        );
    }
}

App.defaultProps = {
    text: '',
};

App.propTypes = {
    text: PropTypes.string,
};

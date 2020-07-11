import React, { Component } from 'react';
import './app.scss';
import {
    BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import { Header } from './header/header';
import { AboutTeam } from './pages/aboutTeam/aboutTeam';
import { Auth } from './pages/auth/auth';
import { Main } from './pages/main/main';
import { MiniGames } from './pages/miniGames/miniGames';
import { Promo } from './pages/promo/promo';
import { Stats } from './pages/stats/stats';
import { Vocabulary } from './pages/vocabulary/vocabulary';
import { NotFound } from './pages/notFound/notFound';
import { SpeakIt } from './games/speakIt/speakIt';
import { EnglishPuzzle } from './games/englishPuzzle/englishPuzzle';
import { Savannah } from './games/savannah/savannah';
import { AudioCall } from './games/audioCall/audioCall';
import { Sprint } from './games/sprint/sprint';
import { Hangman } from './games/hangman/Hangman';
import { Footer } from './footer/footer';
import { Study } from './pages/study/study';
import { Table } from './pages/stats/table';
import { User } from './pages/auth/user';
import { Spinner } from './shared/spinner';
import { MessagePanel } from './message/messagePanel';

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = { isAuth: false, isChecking: true };
    }

    componentDidMount() {
        User.checkToken(this.setAppLogined, this.setAppLogouted);
    }

    setAppLogined = () => {
        this.setState({ isAuth: true, isChecking: false });
    }

    setAppLogouted = () => {
        User.logOut();
        this.setState({ isAuth: false, isChecking: false });
    }

    setMessage = (text, isError = true) => {
        this.setState({ message: { text, isError } });
    }

    render() {
        const { isAuth, isChecking, message } = this.state;
        if (isChecking) {
            return (<Spinner />);
        }

        return (
            <Router>
                <div className="app">
                    <Header isAuth={isAuth} logOut={this.setAppLogouted} />
                    <main>
                        {
                            isAuth
                                ? (
                                    <Switch>
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
                                            <AudioCall setMessage={this.setMessage} />
                                        </Route>
                                        <Route path="/mini-games/sprint">
                                            <Sprint />
                                        </Route>
                                        <Route path="/mini-games/hangman">
                                            <Hangman />
                                        </Route>
                                        <Route exact path="/main">
                                            <Main />
                                        </Route>
                                        <Route path="/main/study">
                                            <Study />
                                        </Route>
                                        <Route exact path="/stats">
                                            <Stats />
                                        </Route>
                                        <Route path="/stats/table">
                                            <Table />
                                        </Route>
                                        <Route path="/vocabulary">
                                            <Vocabulary />
                                        </Route>
                                        <Route path="/about-team">
                                            <AboutTeam />
                                        </Route>
                                        <Route path="/promo">
                                            <Promo />
                                        </Route>
                                        <Redirect to="/main" />
                                        <Route path="/*">
                                            <NotFound />
                                        </Route>
                                    </Switch>
                                )
                                : (
                                    <Switch>
                                        <Route path="/auth">
                                            <Auth logIn={this.setAppLogined} />
                                        </Route>
                                        <Route path="/about-team">
                                            <AboutTeam />
                                        </Route>
                                        <Route path="/promo">
                                            <Promo />
                                        </Route>
                                        <Redirect to="/promo" />
                                        <Route path="/*">
                                            <NotFound />
                                        </Route>
                                    </Switch>
                                )
                        }
                    </main>
                    <Footer />
                    <MessagePanel message={message} />
                </div>
            </Router>
        );
    }
}

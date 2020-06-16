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

export class App extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { text } = this.props;
    return (
      <Router>
        <div className="App">
          <header>
            <Nav />
            {/* <p>{text}</p> */}
          </header>
          <main>
            <Switch>
              <Route path="/auth">
                <Auth />
              </Route>
              <Route path="/mini-games">
                <MiniGames />
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

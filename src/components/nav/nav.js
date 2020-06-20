import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './nav.scss';

export class Nav extends Component {
    render() {
        return (
            <nav className="navigation">
                <ul className="navigation__list navigation__list-showed">
                    <li>
                        <Link to="/main">
                            <div className="navigation__icon main" />
                            <span>Main</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/vocabulary">
                            <div className="navigation__icon vocabulary" />
                            <span>Vocabulary</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/mini-games">
                            <div className="navigation__icon minigames" />
                            <span>Mini games</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/stats">
                            <div className="navigation__icon statistics" />
                            <span>Statistic</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <div className="navigation__icon promo" />
                            <span>Promo</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/about-team">
                            <div className="navigation__icon aboutteam" />
                            <span>About team</span>
                        </Link>
                    </li>
            </nav>
        );
    }
}

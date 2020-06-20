import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './nav.scss';

export class Nav extends Component {
    render() {
        return (
            <nav className="navigation">
                <ul className="navigation__list navigation__list">
                    <li>
                        <div className="navigation__icon main" />
                        <Link to="/main">Main</Link>
                    </li>

                    <li>
                        <div className="navigation__icon vocabulary" />
                        <Link to="/vocabulary">Vocabulary</Link>
                    </li>
                    <li>
                        <div className="navigation__icon minigames" />
                        <Link to="/mini-games">Mini games</Link>
                    </li>
                    <li>
                        <div className="navigation__icon statistics" />
                        <Link to="/stats">Statistic</Link>
                    </li>
                    <li>
                        <div className="navigation__icon promo" />
                        <Link to="/">Promo</Link>
                    </li>
                    <li>
                        <div className="navigation__icon aboutteam" />
                        <Link to="/about-team">About team</Link>
                    </li>

                    <li>
                        <div className="navigation__icon logout" />
                        <Link to="/auth">Logout</Link>
                    </li>

                </ul>
            </nav>
        );
    }
}

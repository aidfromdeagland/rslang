import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './nav.scss';

export class Nav extends Component {
    render() {
        return (
            <nav className="navigation">
                <ul className="navigation__list">
                    <li>
                        <Link to="/">Promo</Link>
                    </li>
                    <li>
                        <Link to="/main">Main</Link>
                    </li>
                    <li>
                        <Link to="/vocabulary">Vocabulary</Link>
                    </li>
                    <li>
                        <Link to="/stats">Statistic</Link>
                    </li>
                    <li>
                        <Link to="/mini-games">Mini games</Link>
                    </li>
                    <li>
                        <Link to="/auth">Auth</Link>
                    </li>
                    <li>
                        <Link to="/about-team">About team</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './nav.scss';

export class Nav extends Component {
    render() {
        const { isOpen } = this.props;
        return (
            <nav className="navigation">
                <ul className={isOpen ? 'navigation__list navigation__list-showed' : 'navigation__list'}>
                    <li>
                        <Link to="/main">
                            <div className="navigation__icon navigation__icon_main" />
                            <span>Main</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/vocabulary">
                            <div className="navigation__icon navigation__icon_vocabulary" />
                            <span>Vocabulary</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/mini-games">
                            <div className="navigation__icon navigation__icon_minigames" />
                            <span>Mini games</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/stats">
                            <div className="navigation__icon navigation__icon_statistics" />
                            <span>Statistic</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            <div className="navigation__icon navigation__icon_promo" />
                            <span>Promo</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/about-team">
                            <div className="navigation__icon navigation__icon_aboutteam" />
                            <span>About team</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './nav.scss';

export class Nav extends Component {
    render() {
        const { isOpen } = this.props;

        return (
            <nav className="navigation">
                <ul className={isOpen ? 'navigation__list navigation__list-showed' : 'navigation__list'}>
                    <li>
                        <NavLink exact activeClassName="link_active" to="/main">
                            <div className="navigation__icon navigation__icon_main" />
                            <span>Main</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink exact activeClassName="link_active" to="/vocabulary">
                            <div className="navigation__icon navigation__icon_vocabulary" />
                            <span>Vocabulary</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact activeClassName="link_active" to="/mini-games">
                            <div className="navigation__icon navigation__icon_minigames" />
                            <span>Mini games</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact activeClassName="link_active" to="/stats">
                            <div className="navigation__icon navigation__icon_statistics" />
                            <span>Statistic</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact activeClassName="link_active" to="/">
                            <div className="navigation__icon navigation__icon_promo" />
                            <span>Promo</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact activeClassName="link_active" to="/about-team">
                            <div className="navigation__icon navigation__icon_aboutteam" />
                            <span>About team</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        );
    }
}

Nav.propTypes = {
    isOpen: PropTypes.bool.isRequired,
};

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './nav.scss';

export class Nav extends Component {
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false);
    }

    handleClick = (e) => {
        const { closeMenu } = this.props;

        if (this.node.parentElement.contains(e.target) && e.target.className !== 'header__container') {
            return;
        }
        closeMenu(false);
    }

    closeByLink = () => {
        const { closeMenu } = this.props;
        closeMenu(false);
    }

    render() {
        const { isOpen, isAuth } = this.props;

        return (
            <nav
                className="navigation"
                ref={(node) => {
                    this.node = node;
                }}
            >
                <ul
                    className={isOpen ? 'navigation__list navigation__list-showed' : 'navigation__list'}
                >
                    <li>
                        <NavLink
                            exact
                            className={isAuth ? 'navigation__link' : 'navigation__link navigation__link_disabled'}
                            activeClassName="navigation__link_active"
                            to="/main"
                            onClick={this.closeByLink}
                        >
                            <div className="navigation__icon navigation__icon_main" />
                            <span>Main</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            exact
                            className={isAuth ? 'navigation__link' : 'navigation__link navigation__link_disabled'}
                            activeClassName="navigation__link_active"
                            to="/vocabulary"
                            onClick={this.closeByLink}
                        >
                            <div className="navigation__icon navigation__icon_vocabulary" />
                            <span>Vocabulary</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            exact
                            className={isAuth ? 'navigation__link' : 'navigation__link navigation__link_disabled'}
                            activeClassName="navigation__link_active"
                            to="/mini-games"
                            onClick={this.closeByLink}
                        >
                            <div className="navigation__icon navigation__icon_mini-games" />
                            <span>Mini games</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            exact
                            className={isAuth ? 'navigation__link' : 'navigation__link navigation__link_disabled'}
                            activeClassName="navigation__link_active"
                            to="/stats"
                            onClick={this.closeByLink}
                        >
                            <div className="navigation__icon navigation__icon_statistics" />
                            <span>Statistic</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact className="navigation__link" activeClassName="navigation__link_active" to="/promo" onClick={this.closeByLink}>
                            <div className="navigation__icon navigation__icon_promo" />
                            <span>Promo</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact className="navigation__link" activeClassName="navigation__link_active" to="/about-team" onClick={this.closeByLink}>
                            <div className="navigation__icon navigation__icon_about-team" />
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
    isAuth: PropTypes.bool.isRequired,
    closeMenu: PropTypes.func.isRequired,
};

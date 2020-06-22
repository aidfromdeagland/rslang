import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './nav.scss';

export class Nav extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.closeByLink = this.closeByLink.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false);
    }

    handleClick(e) {
        const { closeMenu } = this.props;
        if (this.node.parentElement.contains(e.target)) {
            return;
        }
        closeMenu(false);
    }

    closeByLink() {
        const { closeMenu } = this.props;
        closeMenu(false);
    }

    render() {
        const { isOpen } = this.props;

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
                    <li aria-hidden onClick={this.closeByLink}>
                        <NavLink exact activeClassName="link_active" to="/main">
                            <div className="navigation__icon navigation__icon_main" />
                            <span>Main</span>
                        </NavLink>
                   </li>
                    <li aria-hidden onClick={this.closeByLink}>
                        <NavLink exact activeClassName="link_active" to="/vocabulary">                                     
                            <div className="navigation__icon navigation__icon_vocabulary" />
                            <span>Vocabulary</span>
                        </NavLink>
                    </li>
                    <li aria-hidden onClick={this.closeByLink}>
                        <NavLink exact activeClassName="link_active" to="/mini-games">
                            <div className="navigation__icon navigation__icon_minigames" />
                            <span>Mini games</span>
                        </NavLink>
                    </li>
                    <li aria-hidden onClick={this.closeByLink}>
                        <NavLink exact activeClassName="link_active" to="/stats">
                            <div className="navigation__icon navigation__icon_statistics" />
                            <span>Statistic</span>
                        </NavLink>
                    </li>
                    <li aria-hidden onClick={this.closeByLink}>
                        <NavLink exact activeClassName="link_active" to="/">
                            <div className="navigation__icon navigation__icon_promo" />
                            <span>Promo</span>
                        </NavLink>
                    </li>
                    <li aria-hidden onClick={this.closeByLink}>
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
    closeMenu: PropTypes.func.isRequired,
};

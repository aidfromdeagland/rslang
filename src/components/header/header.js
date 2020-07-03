import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Nav } from '../nav/nav';
import { AuthBlock } from './authBlock';
import './header.scss';

export class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }

    closeMenu = (value) => {
        this.setState({ isOpen: value });
    }

    render() {
        const { isOpen } = this.state;
        const { isAuth, logOut } = this.props;
        return (
            <header className="header">
                <Nav isOpen={isOpen} isAuth={isAuth} closeMenu={this.closeMenu} />
                <div className="header__container">
                    <div
                        className="header__hamburger"
                        aria-hidden
                        onClick={() => this.setState({ isOpen: !isOpen })}
                    >
                        <div className={isOpen ? 'header__hamburger-close' : 'header__hamburger-open'} />
                    </div>
                    <div className="header__logo" />
                    <AuthBlock isAuth={isAuth} logOut={logOut} />
                </div>
            </header>
        );
    }
}

Header.propTypes = {
    isAuth: PropTypes.bool.isRequired,
    logOut: PropTypes.func.isRequired,
};

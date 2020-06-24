import React, { Component } from 'react';
import { Nav } from '../nav/nav';
import './header.scss';

export class Header extends Component {
    constructor(props) {
        super(props);
        this.closeMenu = this.closeMenu.bind(this);
        this.state = {
            isOpen: false,
        };
    }

    closeMenu(value) {
        this.setState({ isOpen: value });
    }

    render() {
        const { isOpen } = this.state;
        return (
            <header className="header">
                <Nav isOpen={isOpen} closeMenu={this.closeMenu} />
                <div className="header__container">
                    <div
                        className="header__hamburger"
                        aria-hidden
                        onClick={() => this.setState({ isOpen: !isOpen })}
                    >
                        <div className={isOpen ? 'header__hamburger-close' : 'header__hamburger-open'} />
                    </div>
                    <div className="header__logo" />
                    <div className="header__logout">
                        Logout
                    </div>
                </div>
            </header>
        );
    }
}

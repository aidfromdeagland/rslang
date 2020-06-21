import React, { Component } from 'react';
import { Nav } from '../nav/nav';
import './header.scss';

export class Header extends Component {
    render() {
        return (
            <header className="header">
                <Nav />
                <div className="header__container">
                    <div className="header__navigation">
                        <div className="header__hamburger">
                            <div className="header__hamburger-open" />
                        </div>
                        <div className="header__logo" />
                    </div>
                    <div className="header__logout">
                        Logout
                    </div>
                </div>
            </header>
        );
    }
}

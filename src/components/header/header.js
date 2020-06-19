import React, { Component } from 'react';
import './header.scss';

export class Header extends Component {
    render() {
        return (
            <div className="header">
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
        );
    }
}

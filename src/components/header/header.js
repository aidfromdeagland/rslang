import React, { Component } from 'react';
import { Nav } from '../nav/nav';
import './header.scss';

export class Header extends Component {
    state = {
        isOpen: false,
          };

    render() {
        const { isOpen } = this.state;
        return (
            <header className="header">
                <Nav isOpen={this.state.isOpen} />
                <div className="header__container">
                                           <div 
                        className="header__hamburger"
                        onClick={() => this.setState({ isOpen: !isOpen })}
                        >
                            <div className={isOpen ? 'header__hamburger-close': 'header__hamburger-open'}/>
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

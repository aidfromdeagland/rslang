import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '../../shared/button';

export class Savannah extends Component {
    render() {
        return (
            <div
                className="savannah__start"
            >
                <div className="savannah__start-text">
                    Welcome to dangerous and exciting world of Savannah!
                    Catch up words and get rich!
                    <div>
                        Use Keybord to be faster!
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                    </div>
                </div>

                <NavLink className="savannah__link" to="/mini-games/savannah/savannahGame">
                    <Button className="savannah__start-btn" title="Start game" />
                </NavLink>

            </div>
        );
    }
}

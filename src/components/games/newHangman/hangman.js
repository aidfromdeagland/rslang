import React, { Component } from 'react';
import './hangman.scss';
import { StartPage } from './startPage';

export class Hangman extends Component {
    render() {
        return (
            <div className="hangman">
                <StartPage />
            </div>
        );
    }
}

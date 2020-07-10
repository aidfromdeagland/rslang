import React, { Component } from 'react';
import './englishPuzzle.scss';
import { StartPage } from './startPage';

export class EnglishPuzzle extends Component {
    render() {
        return (
            <div className="english-puzzle">
                <StartPage />
            </div>
        );
    }
}

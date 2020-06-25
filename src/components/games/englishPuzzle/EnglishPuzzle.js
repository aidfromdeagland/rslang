import React, { Component } from 'react';
import './englishPuzzle.scss';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { StartPage } from './StartPage';

export class EnglishPuzzle extends Component {
    render() {
        return (
            <DndProvider backend={HTML5Backend}>
                <div className="english-puzzle">
                    <StartPage />
                </div>
            </DndProvider>
        );
    }
}

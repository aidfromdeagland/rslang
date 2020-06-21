import React, { Component } from 'react';
import './startPage.scss';
import { Game } from './Game';

export class StartPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isStart: false,
        }
    }

    handleClick = () => {
        this.setState({isStart: true});
    }

    render() {
        if (this.state.isStart) {
            return <Game />;
        }
        return (
            <div id="start-page">
                <div className="title">english puzzle</div>
                <div className="description"><p>Click on words, collect phrases.</p><br /><p>Words can be drag and drop. Select tooltips in the menu</p></div>
                <div className="start">
                    <button className="button btn-start" onClick={this.handleClick}>START</button>
                </div>
            </div>
        );
    }
}

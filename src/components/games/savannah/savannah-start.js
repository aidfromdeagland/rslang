import React, { Component } from 'react';
import { Button } from '../../shared/button';
import { Select } from './select';
import { SavannahGame } from './savannah-game';

export class SavannahStart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isStart: false,
            group: 0,
        };
    }

    startGame = () => {
        this.setState({ isStart: true });
    }

    getGroup = (value) => {
        this.setState({ group: value });
    }

    render() {
        const { isStart, group } = this.state;
        if (isStart) {
            return (
                <SavannahGame
                    group={group}
                />
            );
        }
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
                    <div className="savannah__start-select">
                        Select your level:
                        <Select getGroup={this.getGroup} />
                    </div>
                </div>

                <Button
                    onClick={this.startGame}
                    className="savannah__start-btn"
                    title="Start game"
                />
            </div>
        );
    }
}

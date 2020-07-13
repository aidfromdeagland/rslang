/* eslint-disable import/no-cycle */
import React, { Component } from 'react';
import { Button } from '../../shared/button';
import { SelectLevel } from './select-level';
import { SelectRound } from './select-round';
import { SavannahGame } from './savannah-game';
import { WordService } from '../../../services/wordServices';
import { SettingService } from '../../../services/settingServices';
import { settingsDefault } from '../../../constants/globalConstants';

export class SavannahStart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isStart: false,
            mode: 'userWords',
            isAvailableUserWords: true,
        };
    }

    componentDidMount() {
        this.checkAmountOfUserWords();
        this.loadSettings();
    }

    startGame = () => {
        this.setState({ isStart: true });
    }

        getGroup = (value) => {
            this.setState({ group: value });
        }

     getPage = (value) => {
         this.setState({ page: value });
     }

     checkAmountOfUserWords = async () => {
         const userWords = await WordService.getUserWords();
         this.setState({
             isAvailableUserWords: userWords.length > 30,
         });
     }

     handleChange = (e) => {
         this.setState({
             mode: e.target.value,
         });
     }

     getNextPage = (value) => {
         this.setState({
             page: value,
         });
     }

    loadSettings = async () => {
        this.settings = await SettingService.get();
        console.log(this.settings.optional.savannah);
        const settingsForGame = this.settings.optional.savannah
            ? JSON.parse(this.settings.optional.savannah)
            : JSON.parse(settingsDefault.optional.savannah);
        this.setState({
            group: settingsForGame.group,
            page: settingsForGame.page,
        });
    }

    render() {
        const {
            isStart, group, page, mode, isAvailableUserWords,
        } = this.state;

        if (isStart) {
            return (
                <SavannahGame
                    group={group}
                    page={page}
                    mode={mode}
                    getNextPage={this.getNextPage}
                    loadSettings={this.loadSettings}
                    saveSettingsSavannah={this.saveSettingsSavannah}
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
                    <form
                        className="savannah__start-form"
                    >
                        <label htmlFor="user-words">
                            <input
                                type="radio"
                                value="userWords"
                                checked={mode === 'userWords'}
                                onChange={this.handleChange}
                            />
                            Play with your words
                        </label>
                        <label htmlFor="levels">
                            <input
                                type="radio"
                                value="levelWords"
                                checked={mode === 'levelWords'}
                                onChange={this.handleChange}
                            />
                            Select level
                        </label>
                    </form>
                    { !isAvailableUserWords && (mode === 'userWords')
                      && (
                          <div className="savannah__start-warning">
                              Oops, you have not learned enough words yet.
                              Select level to start game
                          </div>
                      )}
                    {mode === 'levelWords' && (
                        <div className="savannah__start-select">
                            Select level:
                            <SelectLevel
                                getGroup={this.getGroup}
                                group={group}
                            />
                            Select round:
                            <SelectRound
                                getPage={this.getPage}
                                page={page}
                            />
                        </div>
                    )}

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

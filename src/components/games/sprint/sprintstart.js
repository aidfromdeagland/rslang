import React, { Component } from 'react';

import { Button } from '../../shared/button';
import { SelectLevel } from './selectlevel';
import { SelectRound } from './selectround';
import { SprintGame } from './sprintgame';
import { WordService } from '../../../services/wordServices';
import { SettingService } from '../../../services/settingServices';

export class SprintStart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isStart: false,
            mode: 'levelWords',
            group: 0,
            page: 0,
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
            isAvailableUserWords: userWords.length > 60,
        });
    }

    handleChange = (e) => {
        this.setState({
            mode: e.target.value,
        });
    }

    loadSettings = async () => {
        let { group, page } = this.state;
        const result = await SettingService.get();
        const sprintSettings = result.optional.sprint;
        
        if(sprintSettings !== undefined) {
            const settings = (JSON.parse(sprintSettings));
            group = settings.group;
            page = settings.page;
        }
        this.setState({
            group: group,
            page: page,
        });
    }    

    render() {
        const {
            isStart, group, page, mode, isAvailableUserWords,
        } = this.state;

        if (isStart) {
            return (
                <SprintGame
                    group={group}
                    page={page}
                    mode={mode}
                    loadSettings={this.loadSettings}
                />
            );
        }
      return (
          <div className="sprint" >
              <div className="splash">
                  <h1>Sprint</h1>
                  <p>In one minute you will be shown a couple of words. 
                  Your task is to determine whether the words are translations of each other.</p>

                 <form className="sprint__start-form" >
                     <label htmlFor="user-words">
                         <input
                             type="radio"
                             value="userWords"
                             checked={mode === 'userWords'}
                             onChange={this.handleChange}
                         />
                         <span>Play with your words</span>
                     </label>
                     <label htmlFor="levels">
                         <input
                             type="radio"
                             value="levelWords"
                             checked={mode === 'levelWords'}
                             onChange={this.handleChange}
                         />
                         <span>Select level</span>
                     </label>
                 </form>
                 { !isAvailableUserWords && (mode === 'userWords')
                  && (
                      <div className="sprint__start-warning">
                          Oops, you have not learned enough words yet. Select level to start game
                      </div>
                  )}
                 {mode === 'levelWords' && (
                     <div className="sprint__start-select">
                            <span>Level:</span>
                            <SelectLevel
                                getGroup={this.getGroup}
                                group={group}
                            />
                            <span>Page:</span>
                            <SelectRound
                                getPage={this.getPage}
                                page={page}
                            />
                     </div>
                 )}

             <Button
                 onClick={this.startGame}
                 title="Start game"
             />
              </div>
          </div>
       );
    }
}

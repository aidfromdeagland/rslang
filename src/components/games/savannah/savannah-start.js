import React, { Component } from 'react';
import { Button } from '../../shared/button';
import { SelectLevel } from './select-level';
import { SelectRound } from './select-round';
import { SavannahGame } from './savannah-game';
import { WordService } from '../../../services/wordServices';
import { UserService } from '../../../services/userServices';

export class SavannahStart extends Component {
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
         this.setState({ page: value });
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
                              Oops, you have not learned enough words yet. Select level to start game
                          </div>
                      )}
                     {mode === 'levelWords' && (
                         <div className="savannah__start-select">
                             Select level:
                             <SelectLevel getGroup={this.getGroup} />
                             Select round:
                             <SelectRound getPage={this.getPage} />
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

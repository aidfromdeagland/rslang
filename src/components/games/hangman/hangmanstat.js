import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './hangmanstat.scss';

export class Hangmanstat extends Component {
    // constructor(props) {
    //     super(props);
    //     //this.state = {}
    //     this.goBack = this.goBack.bind(this);
    // }

    // componentDidMount() {
    //     console.log('Stat');
    //     document.title = 'Hangman Statistics';
    //     this.content.focus();
    //     //this.dataInit(1);
    //     // получение статистики из localstorage
    //     //let HangmanStat = (localStorage.getItem('HangmanStat') == null) ? [] : localStorage.getItem('HangmanStat');
    //     //document.addEventListener('keydown', this.listenerletter, false);
    // }

   // componentWillUnmount() {
       // document.removeEventListener('keydown', this.listenerletter, false);
   // }

   

    render() {
        //const {isContinue} = this.state;
        console.log('Stat');
        return (
            <div className="hangmanstat">
                {/* <h1 tabIndex="-1" ref={( content ) => {this.content = content;}}>Hangman</h1> */}
                {/* <h1>Hangman</h1> */}
                <h2>Statistics</h2>
                <div className="stat">
                    <div className="stat-current">
                        <h3>Current game</h3>
                    </div>
                    <div className="stat-history">
                    <h3>History</h3>
                    </div>
                </div>   
                <NavLink to="/mini-games/hangman">
                    <div className='btn-back'>Back</div>
                </NavLink>
            </div>
        );
    }

}    

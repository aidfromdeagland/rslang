import React, { Component } from 'react';
import './hangman.scss';

import gal0 from '../../../components/games/hangman/hangmanimg/gal0.png';
import gal1 from '../../../components/games/hangman/hangmanimg/gal1.png';
import gal2 from '../../../components/games/hangman/hangmanimg/gal2.png';
import gal3 from '../../../components/games/hangman/hangmanimg/gal3.png';
import gal4 from '../../../components/games/hangman/hangmanimg/gal4.png';
import gal5 from '../../../components/games/hangman/hangmanimg/gal5.png';
import gal6 from '../../../components/games/hangman/hangmanimg/gal6.png';
import pron from '../../../components/games/hangman/hangmanimg/pron.png';
import stat64 from '../../../components/games/hangman/hangmanimg/stat-64.png';
import { NavLink } from 'react-router-dom';
import { WordService } from '../../../services/wordServices';
import { AUDIO_URL } from '../../../constants/globalConstants';
import './hangmanstat.scss';

export class Hangman extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isContinue: false,
            isPron: false,
            isStat: false,
            currentWord: [],
            galImgURL: `${gal0}`,
            wordStat: {
                word: '',
                isGuess: false,
                countMovies: 0,
                unguessletters: [],
                falseletters: [],
                numberGame: 0,
        },
        countGames: 0,
         

        };
        
        this.dataInit = this.dataInit.bind(this);
        this.listenerletter = this.listenerletter.bind(this);
        this.changeGal = this.changeGal.bind(this);
        this.changeStatistics = this.changeStatistics.bind(this);
        this.dopPron = this.dopPron.bind(this);
    } 

    dataInit(n){
        this.setState((prevState) => {
            let arr = this.getWord(n);
            this.letterTrue = []; 
            this.letterTrue.push(arr[0]);
            this.letterTrue.push(arr[arr.length-1]);
            return {currentWord: arr};
        });
        this.setState({isContinue: false});
        this.letterFalse = [];
        this.countletter = 6;
        this.hangmanLS = [];
        this.hangmanLS = (localStorage.getItem('hangmanLS') === null) ? this.hangmanLS : localStorage.getItem('hangmanLS');
      
        
    }
  
    changeGal(){
        let n = this.letterFalse.length;
        this.setState((prevState) => {
            let ind = `gal${n}`; 
            return {galImgURL: `${ind}`};
        });        
    }

    listenerletter(event){ 
        event.preventDefault();
        let letter = event.key.toLowerCase();
        let ind = this.state.currentWord.indexOf(letter);
        if ( ind > 0 ){
            if (this.letterTrue.indexOf(letter) > 0){
                ind = -1;                
            }
            while ( ind !== -1){
                this.letterTrue.push(letter);
                document.getElementById(`l${ind}`).classList.add('activ');
                ind = this.state.currentWord.indexOf(letter, ind + 1);
            }    
        }
        else{
            this.letterFalse.push(letter);
            this.changeGal();
        };
        this.finishWord();
    };

    componentDidMount() {
        this.dataInit(1);
        document.addEventListener('keydown', this.listenerletter, false);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.listenerletter, false);
    }


    handleContinue() {
        this.dataInit(2);
        document.addEventListener('keydown', this.listenerletter, false);
        document.querySelectorAll('div.letter').forEach(el => el.classList.remove('word-true'));
        document.querySelectorAll('div.letter').forEach(el => el.classList.remove('word-false'));
        for (let i=1; i<=this.countletter; i++){
            document.getElementById(`l${i}`).classList.remove('activ');
        };    
    };

    finishWord(){
        
        if (this.state.currentWord.length === this.letterTrue.length){
            if ( isPron) {
                
            }; 
            document.querySelectorAll('div.letter').forEach(el => el.classList.add('word-true'));
            this.setState({isContinue: true});
            document.removeEventListener('keydown', this.listenerletter, false);
            this.changeStatistics(true);
        };
        if (this.letterFalse.length >= this.countletter){
            document.querySelectorAll('div.letter').forEach(el => el.classList.add('word-false'));
            document.removeEventListener('keydown', this.listenerletter, false);
            this.changeStatistics(false);
            this.setState({isContinue: true});
        }
    }

    changeStatistics(value){
        this.setState((state) => {
            return {wordStat: 
                {word: this.state.currentWord.join(''),
                isGuess: value,
                countMovies: this.letterFalse.length + this.letterTrue.length - 2,
                //wordStat.unguessletters: 
                falseletters: this.letterFalse,
                numberGame: this.state.countGames
                }        
            }
        });
        this.hangmanLS.push(this.state.wordStat); //to-do: не добавлять повторяющиеся слова, обновить по ним только статистику
        localStorage.setItem('hangmanLS', this.hangmanLS);
    }

   
    async getWord(n) {
        const data = await WordService.getWords(1, 1);
        return data;
    }

    dopPron(url){
        new Pron(AUDIO_URL + url).play();
        let newIsPron = !this.state.isPron;
        this.setState({isPron: newIsPron});
    }

    render() {
        const {isContinue, isPron, isStat} = this.state;
               
        return (
            <div className="hangman">
                <h1>Hangman</h1>
                <div className="dop-block">
                    <button className={isPron ? "dop-block-el dop-active" : "dop-block-el"} onClick={() => this.dopPron()}>
                        <img style={{width: 30, height: 30}} src={pron} alt='Pron'></img>
                    </button>
                    <NavLink to={'/mini-games/hangman/hangmanstat'}>  
                        <button id="dopStat" className={isStat ? "dop-block-el dop-active" : "dop-block-el"}>  
                            <img style={{width: 30, height: 30}} src={stat64} alt='Stat'></img>
                        </button>
                    </NavLink> 

                  
                </div>
                <div className="gallows">
                    <img style={{width: 400, height: 500}} src= {this.state.galImgURL} alt="Gallows"></img> 
                </div>
                <div id="word" className="word">
                <div id="l0" className="letter activ">{this.state.currentWord[0]}</div>
                    <div id="l1" className="letter">{this.state.currentWord[1]}</div>
                    <div id="l2" className="letter">{this.state.currentWord[2]}</div>
                    <div id="l3" className="letter">{this.state.currentWord[3]}</div>
                    <div id="l4" className="letter">{this.state.currentWord[4]}</div>
                    <div id="l5" className="letter">{this.state.currentWord[5]}</div>
                    <div id="l6" className="letter">{this.state.currentWord[6]}</div>
                    <div id="l7" className="letter activ">{this.state.currentWord[7]}</div>
                </div>
                <div id="btn-continue" className={isContinue ? 'btn-continue btn-active' : 'btn-continue'} onClick={() => this.handleContinue()}>                    
                        Continue
                </div>
            </div>
        );
    }
}



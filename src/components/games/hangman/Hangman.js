import React, { Component } from 'react';
import './hangman.scss';
//import {Hangmanstat} from './hangmanstat.js';
import pron from '../../../components/games/hangman/hangmanimg/pron.png';
import trans32 from '../../../components/games/hangman/hangmanimg/transl52.png';
import stat64 from '../../../components/games/hangman/hangmanimg/stat-64.png';
import { NavLink } from 'react-router-dom';
import { WordService } from '../../../services/wordServices';
import { MEDIA_PREFIX_URL } from '../../../constants/globalConstants';
import {Gallows} from './hangmangal';

import './hangmanstat.scss';

export class Hangman extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isContinue: false,
            isPron: false,
            isTranslate: false,
            isStat: false,
            currentWord: [],
            wordStat: {
                word: '',
                audio: '',
                id: '',
                image: '',
                wordTranslate: '',
                isGuess: false,
                countMovies: 0,
                unguessletters: [],
                falseletters: [],
                numberGame: 0,
            },
            countGames: 0,
        };
        this.numberWord = 0;  //номер слова в массиве слов для игры
        this.dataInit = this.dataInit.bind(this);
        this.listenerletter = this.listenerletter.bind(this);
        this.changeGal = this.changeGal.bind(this);
        this.changeStatistics = this.changeStatistics.bind(this);
        this.dopPron = this.dopPron.bind(this);
    } 

    async dataInit(n){
        const ind = Math.floor( 0 + Math.random() * ( 19 + 1 - 0 ));
        const arr = await this.getWord(n);
        let gameWord = [];
        this.letterTrue = []; 
        Promise.all(arr).then( 
            gameWord = arr[ind].word.split(''),
            gameWord = 'download'.split(''),
            this.setState({ 
            //this.setState((State) => { 
            //    return{ 
                    wordStat:  {
                        word: arr[ind].word,
                        audio: arr[ind].audio,
                        id: arr[ind].id,
                        image: arr[ind].image,
                        wordTranslate: arr[ind].wordTranslate,
                        isGuess: false,
                        countMovies: 0,
                        unguessletters: [],
                        falseletters: [],
                        numberGame: 0,
                    },
                    currentWord: gameWord
            //    }  
            }),    
            this.letterTrue.push(gameWord[0]),
            this.letterTrue.push(gameWord[gameWord.length-1]),
      

            //     this.setState((prevState) => {
            //        // let arr = this.getWord(n);
            //        // console.log('game word = ', arr);
                
            //         //let gameWord = arr[ind].word.split('');
            //         let gameWord = 'develope'.split('');
            //         this.letterTrue.push(gameWord[0]);
            //         this.letterTrue.push(gameWord[gameWord.length-1]);
            //         console.log('word = ',  gameWord);
            //         console.log('lettertrue = ',  this.letterTrue);
            //             //this.letterTrue.push(arr[0]),
            //             //this.letterTrue.push(arr[arr.length-1]),
            //         return {currentWord: gameWord}    
            //     }),
            //console.log(this.state.wordStat)
        );
        this.setState({isContinue: false});
        this.letterFalse = [];
        this.countletter = 6;
        this.hangmanLS = [];
        this.hangmanLS = (localStorage.getItem('hangmanLS') === null) ? this.hangmanLS : localStorage.getItem('hangmanLS');
    }
  
    changeGal(){
        let n = this.letterFalse.length;
        document.getElementById(`pic${n}`).classList.remove('gallows-hidden');
        document.getElementById(`pic${n}`).classList.add('gallows-visible');
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
        //this.content.focus();
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
            document.getElementById(`pic${i}`).classList.remove('gallows-visible');
            document.getElementById(`pic${i}`).classList.add('gallows-hidden');
        };    
    };

    finishWord(){
        
        if (this.state.currentWord.length === this.letterTrue.length){
            document.querySelectorAll('div.letter').forEach(el => el.classList.add('word-true'));
            this.setState({isContinue: true});
            document.removeEventListener('keydown', this.listenerletter, false);
            this.changeStatistics(true);
        };
        if (this.letterFalse.length >= this.countletter){
            //console.log('finish2');
            document.querySelectorAll('div.letter').forEach(el => el.classList.add('word-false'));
            document.removeEventListener('keydown', this.listenerletter, false);
            this.changeStatistics(false);
            this.setState({isContinue: true});
        }
    }

    changeStatistics(value){
        // this.setState((state) => {
        //     return {wordStat: 
        //         {//word: this.state.currentWord.join(''),
        //         isGuess: value,
        //         countMovies: this.letterFalse.length + this.letterTrue.length - 2,
        //         //wordStat.unguessletters: 
        //         falseletters: this.letterFalse,
        //         numberGame: this.state.countGames
        //         }        
        //     }
        // });

        // произношение
        if ( this.state.isPron) {
            let url = this.state.wordStat.audio;
            //console.log(AUDIO_PREFIX_URL + url);
            new Audio(MEDIA_PREFIX_URL + url).play();
            //this.dopPron(this.state.wordStat.audio);
        }; 
        this.setState({
            wordStat: {
                word: this.state.currentWord.join(''),
                audio: this.state.wordStat.audio,
                id: this.state.wordStat.id,
                image: this.state.wordStat.image,
                wordTranslate: this.state.wordStat.wordTranslate,
                isGuess: value,
                countMovies: this.letterFalse.length + this.letterTrue.length - 2,
                unguessletters: [],
                falseletters: this.letterFalse,
                numberGame: this.state.countGames
            }        
            
        });
        //this.hangmanLS.push(this.state.wordStat); //to-do: не добавлять повторяющиеся слова, обновить по ним только статистику
        //localStorage.setItem('hangmanLS', this.hangmanLS);
        //console.log(this.hangmanLS);
        //console.log(this.state.wordStat);

    }

    async getWord(n) {
        const group = Math.floor(0 + Math.random() * (5 - 0));
        const page = Math.floor(0 + Math.random() * (29 - 0));
        const data = await WordService.getWords(group, page);
        return data;
    }

    dopPron(){
        let newIsPron = !this.state.isPron;
        this.setState({isPron: newIsPron});
    }
    
    handleTranslate(){
        let newIsTranslate = !this.state.isTranslate;
        this.setState({isTranslate: newIsTranslate});
    }

    render() {
        const {isContinue, isPron, isStat, isTranslate} = this.state;
        return (
            <div className="hangman">
                <h1>Hangman</h1>
                <div className="dop-block">
                    <button className={isPron ? "dop-block-el dop-active" : "dop-block-el"} onClick={() => this.dopPron()}>
                        <img style={{width: 30, height: 30}} src={pron} alt='Pron'></img>
                    </button>
                    <button className={isTranslate ? "dop-block-el dop-active" : "dop-block-el"}  onClick={() => this.handleTranslate()}>
                        <img style={{width: 30, height: 30}} src={trans32} alt='Translate'></img>
                    </button>
                    <NavLink to={'/mini-games/hangman/hangmanstat'}>  
                        <button id="dopStat" className={isStat ? "dop-block-el dop-active" : "dop-block-el"}>  
                        {/* <button id="dopStat" className={isStat ? "dop-block-el dop-active" : "dop-block-el"} onClick={() => this.setState({isStat: !isStat})}>  */}
                            <img style={{width: 30, height: 30}} src={stat64} alt='Stat'></img>
                        </button>
                    </NavLink> 

                    {/* <button id="dopStat" className={isStat ? "dop-block-el dop-active" : "dop-block-el"} > 
                        <a href="/mini-games/hangman/hangmanstat">
                            <img style={{width: 30, height: 30}} src={stat64} alt='Stat'></img>
                        </a>
                    </button> */}

                    {/* <nav class="navbar" id="navbar">
                        <ul>
                            <li><a><img class="nav-img" src="./images/dict-active.png" alt="Pic"></a></li>
                            <li><a><img class="nav-img" src="./images/docum-active.png" alt="Pic"></a></li>
                        </ul>
                    </nav>  */}
                </div>
                <div className={isTranslate ? "wordtransl wordtransl-active" : "wordtransl"}>  {this.state.wordStat.wordTranslate} </div>
                
                <Gallows/>
                
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

            {/* <div className="hangmanstat">
                <h2>Statistics</h2>
                <div className="stat">
                    <div className="stat-current">
                        <h3>Current game</h3>
                    </div>
                    <div className="stat-history">
                    <h3>History</h3>
                    </div>
                </div>    
                <div className='btn-back' onClick={()=>hashHistory.goBack()}>                    
                    Back
                </div> 
            </div> */}


            </div>
        );
    }
}



import React, { Component } from 'react';
import { Button } from '../../shared/button';
import './hangman.scss';
import {HangmanStat} from './hangmanstat';
import pron from '../../../components/games/hangman/hangmanimg/pron.png';
import trans32 from '../../../components/games/hangman/hangmanimg/transl52.png';
import { WordService } from '../../../services/wordServices';
import { MEDIA_PREFIX_URL } from '../../../constants/globalConstants';
import {Gallows} from './hangmangal';

export class HangmanGame extends Component {
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
                countMoves: 0,
                unguessletters: [],
                falseletters: [],
                numberGame: 0,
                falseLetters: [],
                trueLetters: [],
            },
            countGames: 0,
            level: this.props.level,
            page: this.props.page,
        };
        this.numberWord = 0;  //номер слова в массиве слов для игры
        this.dataInit = this.dataInit.bind(this);
        this.listenerletter = this.listenerletter.bind(this);
        this.changeGal = this.changeGal.bind(this);
        this.changeStatistics = this.changeStatistics.bind(this);
        this.dopPron = this.dopPron.bind(this);
        this.handleStatistics = this.handleStatistics.bind(this);
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
                    wordStat:  {
                        word: arr[ind].word,
                        audio: arr[ind].audio,
                        id: arr[ind].id,
                        image: arr[ind].image,
                        wordTranslate: arr[ind].wordTranslate,
                        isGuess: false,
                        countMoves: 0,
                        unguessletters: [],
                        falseletters: [],
                        numberGame: 0,
                        falseLetters: [],
                        trueLetters: [],
                    },
                    currentWord: gameWord
            }),    
            this.letterTrue.push(gameWord[0]),
            this.letterTrue.push(gameWord[gameWord.length-1]),
        );
        this.setState({isContinue: false});
        this.letterFalse = [];
        this.countletter = 6;
        this.hangmanLS = (localStorage.getItem('hangmanLS') === null) ? [] : localStorage.getItem('hangmanLS');
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
            document.querySelectorAll('div.letter').forEach(el => el.classList.add('word-false'));
            document.removeEventListener('keydown', this.listenerletter, false);
            this.changeStatistics(false);
            this.setState({isContinue: true});
        }
    }

    changeStatistics(value){
        if ( this.state.isPron) {
            let url = this.state.wordStat.audio;
            new Audio(MEDIA_PREFIX_URL + url).play();
        }; 
        this.setState({
            wordStat: {
                word: this.state.currentWord.join(''),
                audio: this.state.wordStat.audio,
                id: this.state.wordStat.id,
                image: this.state.wordStat.image,
                wordTranslate: this.state.wordStat.wordTranslate,
                isGuess: value,
                countMoves: this.letterFalse.length + this.letterTrue.length - 2,
                unguessletters: [],
                falseletters: this.letterFalse,
                numberGame: this.state.countGames,
                falseLetters: this.letterFalse,
                trueLetters: this.letterTrue,
            }        
            
        });
        //this.hangmanLS.push(this.state.wordStat); //to-do: не добавлять повторяющиеся слова, обновить по ним только статистику
        //localStorage.setItem('hangmanLS', this.hangmanLS);

    }

    async getWord(n) {
        const data = await WordService.getWords(this.state.level, this.state.page);
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

    handleStatistics(value) {
        this.setState({isStat: value});
    }

    render() {
        const {isContinue, isPron, isStat, isTranslate} = this.state;
        if (isStat) {
            return (
                <HangmanStat
                    handleStatistics={this.handleStatistics}
                    wordStat={this.state.wordStat}
                    hangmanLS={this.hangmanLS}
                />
            );
        }

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
                <Button id="btn-continue"  className={isContinue ? 'btn-continue btn-active' : 'btn-continue'}
                    onClick={() => {this.handleContinue()}}
                     title="Continue"
                 />
                <Button className={isContinue ? 'btn-continue btn-active' : 'btn-continue'}
                    onClick={() => {this.handleStatistics(true)}}
                    title="Statistics"
                />
            </div>
        );
    }
}



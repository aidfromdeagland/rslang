import React, { Component } from 'react';
import './hangman.scss';

import gal0 from '../../../components/games/hangman/hangmanimg/gal0.png';
import gal1 from '../../../components/games/hangman/hangmanimg/gal1.png';
import gal2 from '../../../components/games/hangman/hangmanimg/gal2.png';
import gal3 from '../../../components/games/hangman/hangmanimg/gal3.png';
import gal4 from '../../../components/games/hangman/hangmanimg/gal4.png';
import gal5 from '../../../components/games/hangman/hangmanimg/gal5.png';
import gal6 from '../../../components/games/hangman/hangmanimg/gal6.png';

export class Hangman extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isContinue: false,
            currentWord: [],
            galImgURL: `${gal0}`,
        };
        this.dataInit = this.dataInit.bind(this);
        this.listenerletter = this.listenerletter.bind(this);
        this.changeGal = this.changeGal.bind(this);
    } 

    dataInit(n){
        this.setState((prevState) => {
            let arr = this.getWord(n);
            this.letterTrue = []; 
            this.letterTrue.push(arr[0]);
            this.letterTrue.push(arr[arr.length-1]);
            console.log(arr);
            return {currentWord: arr};
        });
        this.letterFalse = [];
        this.countletter = 6;
    }
  
    changeGal(){
        let n = this.letterFalse.length;
        this.setState((prevState) => {
            let ind = `gal${n}`; 
            //return {galImgURL: `${ind}`};
            return {galImgURL:  `${gal0}`}; //временно закрыта смена картинок
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
            document.querySelectorAll('div.letter').forEach(el => el.classList.add('word-true'));
            this.setState({isContinue: true});
            document.removeEventListener('keydown', this.listenerletter, false);
        };
        if (this.letterFalse.length >= this.countletter){
            document.querySelectorAll('div.letter').forEach(el => el.classList.add('word-false'));
            document.removeEventListener('keydown', this.listenerletter, false);
            this.setState({isContinue: true});
        }
    }

    getWord(n) {
        let word='';
        if (n===1) {
            word = 'download';
        }
        else{
            word = 'listener';
        }    
        return word.split('');
    }

    render() {
        const {isContinue} = this.state;
               
        return (
            <div className="hangman">
                <h1>Hangman</h1>
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



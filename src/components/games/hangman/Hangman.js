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
            CurrentWord: [],
            GalImgURL: `${gal0}`,
        };
        this.onInit = this.onInit.bind(this);
        this.listenerLetter = this.listenerLetter.bind(this);
        this.onChangeGal = this.onChangeGal.bind(this);
    } 

    onInit(n){
        this.setState((prevState) => {
            let arr = this.getWord(n);
            this.LetterTrue = []; 
            this.LetterTrue.push(arr[0]);
            this.LetterTrue.push(arr[arr.length-1]);
            return {CurrentWord: arr};
        });
        this.LetterFalse = [];
        this.CountLetter = 6;
    }
  
    onChangeGal(){
        let n = this.LetterFalse.length;
        this.setState((prevState) => {
            let ind = `gal${n}`; 
            return {GalImgURL: `${ind}`};
        });        
    }

    listenerLetter(event){ 
        event.preventDefault();
        let Letter = event.key.toLowerCase();
        let ind = this.state.CurrentWord.indexOf(Letter);
        if ( ind > 0 ){
            if (this.LetterTrue.indexOf(Letter) > 0){
                ind = -1;                
            }
            while ( ind !== -1){
                this.LetterTrue.push(Letter);
                document.getElementById(`l${ind}`).classList.add('activ');
                ind = this.state.CurrentWord.indexOf(Letter, ind + 1);
            }    
        }
        else{
            this.LetterFalse.push(Letter);
            this.onChangeGal();
        };
        this.onFinishWord();
    };

    componentDidMount() {
        this.onInit(1);
        document.addEventListener('keydown', this.listenerLetter, false);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.listenerLetter, false);
    }


    onContinue() {
        this.onInit(2);
        console.log('continue=', this.state.CurrentWord);
        document.addEventListener('keydown', this.listenerLetter, false);
        document.querySelectorAll('div.letter').forEach(el => el.classList.remove('word-true'));
        for (let i=1; i<=this.CountLetter; i++){
            document.getElementById(`l${i}`).classList.remove('activ');
        };    
    };

    onFinishWord(){
        
        if (this.state.CurrentWord.length === this.LetterTrue.length){
            console.log('finish1');
            document.querySelectorAll('div.letter').forEach(el => el.classList.add('word-true'));
            this.setState({isContinue: true});
            document.removeEventListener('keydown', this.listenerLetter, false);
        };
        if (this.LetterFalse.length >= this.CountLetter){
            console.log('finish2');
            document.querySelectorAll('div.letter').forEach(el => el.classList.add('word-false'));
            document.removeEventListener('keydown', this.listenerLetter, false);
        }
    }

    getWord(n){
        if (n===1) var Word = 'download';
        else Word='listener';
        return Word.split('');
    }

    render() {
        const {isContinue} = this.state;
        return (
            <div className="hangman">
                <h1>Hangman</h1>
                <div className="gallows">
                    <img style={{width: 400, height: 500}} src= {this.state.GalImgURL} alt="Gallows"></img> 
                </div>
                <div id="word" className="word">
                    <div id="l0" className="letter activ">{this.state.CurrentWord[0]}</div>
                    <div id="l1" className="letter">{this.state.CurrentWord[1]}</div>
                    <div id="l2" className="letter">{this.state.CurrentWord[2]}</div>
                    <div id="l3" className="letter">{this.state.CurrentWord[3]}</div>
                    <div id="l4" className="letter">{this.state.CurrentWord[4]}</div>
                    <div id="l5" className="letter">{this.state.CurrentWord[5]}</div>
                    <div id="l6" className="letter">{this.state.CurrentWord[6]}</div>
                    <div id="l7" className="letter activ">{this.state.CurrentWord[7]}</div>
                </div>
                <div id="btn-continue" className={isContinue ? 'btn-continue btn-active' : 'btn-continue'} onClick={() => this.onContinue()}>                    
                    Continue
                </div>
            </div>
        );
    }
}

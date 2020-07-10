import React, { Component } from 'react';
import './startPage.scss';
import './game-puzzle.scss';
import { Button } from '../../shared/button';
import { getMemoInfoMiniGames } from '../../../services/spacedRepetition';
import { WordService } from '../../../services/wordServices';

let audio;
let audioPlay;
export class ButtonsBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlayingAudio: false,
        };
    }

    handleCheck = () => {
        const {
            correctSentence,
            audioSentence,
            showButton,
            isAutoPronunciation,
            wordCount,
            addToResults,
            isGameWithUserWords,
            wordForGameRound,
        } = this.props;
        const newCorrectSentence = correctSentence.split(' ');
        document.querySelectorAll('.completed').forEach((word) => {
            word.classList.remove('correct-word');
            word.classList.remove('un-correct-word');
        });
        document.querySelectorAll('.completed').forEach((word, index) => {
            if (word.textContent === newCorrectSentence[index]) {
                word.classList.add('correct-word');
                return;
            }
            word.classList.add('un-correct-word');
        });

        if (document.querySelectorAll('.correct-word').length === newCorrectSentence.length) {
            document.querySelectorAll('.correct-word').forEach((word) => {
                word.onmousedown = () => false;
            });
            showButton('isContinueBtn', true);
            showButton('isCheckBtn', false);
            const urlAudio = `https://raw.githubusercontent.com/aidfromdeagland/rslang-data/master/${audioSentence}`;
            if (isAutoPronunciation) {
                this.handlePlayAudio(urlAudio);
            }
            addToResults('know', correctSentence, urlAudio);
            if (isGameWithUserWords) {
                const result = getMemoInfoMiniGames(true, wordForGameRound.userWord.optional.repeats, wordForGameRound.userWord.optional.nextDate);
                const wordPut = { ...wordForGameRound };
                wordPut.userWord.optional.repeats = result.repetitions;
                wordPut.userWord.optional.prevDate = result.prevRepetitionDate;
                wordPut.userWord.optional.nextDate = result.nextRepetitionDate;
                WordService.putWord(wordPut.id, { optional: wordPut.userWord.optional });
            }
        } else {
            showButton('isDontKnowBtn', true);
        }
    }

    handleContinue = () => {
        const {
            showButton,
            wordCount,
            getNextWord,
            showResults,
        } = this.props;
        if (audioPlay) {
            audioPlay.then(() => {
                audio.pause();
            });
        }
        showButton('isDontKnowBtn', true);
        showButton('isContinueBtn', false);
        showButton('isCheckBtn', false);
        if (wordCount < 9) {
            getNextWord(wordCount + 1);
        }
        if (wordCount === 9) {
            showResults();
        }
    }

    handleDontKnow = () => {
        const {
            showButton,
            correctSentence,
            addToResults,
            isAutoPronunciation,
            audioSentence,
            wordForGameRound,
            isGameWithUserWords,
        } = this.props;
        document.querySelector('.puzzle-container-sentence').innerHTML = '';
        document.querySelector('.puzzle-pieces').innerHTML = '';

        correctSentence.split(' ').map((word) => {
            const wordPuzzle = `<div class="drag-word completed"><span class="word-text">${word}</span></div>`;
            document.querySelector('.puzzle-container-sentence').insertAdjacentHTML('beforeend', wordPuzzle);
        });
        showButton('isContinueBtn', true);
        const urlAudio = `https://raw.githubusercontent.com/aidfromdeagland/rslang-data/master/${audioSentence}`;
        if (isAutoPronunciation) {
            this.handlePlayAudio(urlAudio);
        }
        showButton('isDontKnowBtn', false);
        showButton('isCheckBtn', false);
        addToResults('dontKnow', correctSentence, urlAudio);
        if (isGameWithUserWords) {
            const result = getMemoInfoMiniGames(false, wordForGameRound.userWord.optional.repeats, wordForGameRound.userWord.optional.nextDate);
            const wordPut = { ...wordForGameRound };
            wordPut.userWord.optional.repeats = result.repetitions;
            wordPut.userWord.optional.prevDate = result.prevRepetitionDate;
            wordPut.userWord.optional.nextDate = result.nextRepetitionDate;
            WordService.putWord(wordPut.id, { optional: wordPut.userWord.optional });
        }
    }

    handlePlayAudio = (url) => {
        if (audioPlay) {
            audioPlay.then(() => {
                audio.pause();
                audio = new Audio(url);
                audioPlay = audio.play();
                audio.onplaying = () => {
                    this.setState({ isPlayingAudio: true });
                };
                audio.onended = () => {
                    this.setState({ isPlayingAudio: false });
                };
                audio.onpause = () => {
                    this.setState({ isPlayingAudio: false });
                };
            });
        } else {
            audio = new Audio(url);
            audioPlay = audio.play();
            audio.onplaying = () => {
                this.setState({ isPlayingAudio: true });
            };
            audio.onended = () => {
                this.setState({ isPlayingAudio: false });
            };
            audio.onpause = () => {
                this.setState({ isPlayingAudio: false });
            };
        }
    }

    render() {
        const { isPlayingAudio } = this.state;
        const {
            isCheckBtn,
            isDontKnowBtn,
            isContinueBtn,
            audioSentence,
        } = this.props;
        return (
            <div className="game-board__btn-block">
                {isCheckBtn && <Button className="check-sentence puzzle-btn button" title="Check" onClick={this.handleCheck} />}
                {isDontKnowBtn && <Button className="dont-know-sentence puzzle-btn button" title="Don't know" onClick={this.handleDontKnow} />}
                {isContinueBtn && <Button className="continue-sentence puzzle-btn button" title="Continue" onClick={this.handleContinue} />}
                <Button
                    className={isPlayingAudio ? 'dynamic-btn playing' : 'dynamic-btn'}
                    onClick={() => this.handlePlayAudio(`https://raw.githubusercontent.com/aidfromdeagland/rslang-data/master/${audioSentence}`)}
                />
            </div>
        );
    }
}

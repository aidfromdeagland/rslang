import React, { Component } from 'react';
import './study.scss';
import dynamic from '../../../assets/icons/dynamic.svg';
import exampleImg from '../../../assets/images/example.jpg';
import next from '../../../assets/images/next-arrow.png';
import { Button } from '../../shared/button';
import { Answer } from './Answer';
import { dataForExample, settingsForExample } from './dataForExample';
import { WordService } from '../../../services/wordServices';
import { SettingService } from '../../../services/settingServices';
import { Spinner } from '../../shared/spinner';

export class Study extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxWordsOfTheDay: 10,
            wordCount: 1,
            valueInput: '',
            isCorrectWord: null,
            isLoading: true,
            isLoadSettings: false,
        };
    }

    componentDidMount() {
        if (!this.settings) {
            this.getSettings();
        }

    }

    getSettings = async () => {
        const settings = await SettingService.get();
        this.settings = settings.optional;
        this.context = this.chooseLearnMethod();
        console.log(this.context);
        this.audioContext = `audio${this.context.slice(4)}` || 'audio';
        this.dataForCard = {
            context: dataForExample[this.context],
            word: dataForExample.word,
            wordTranslate: dataForExample.wordTranslate,
            audioContext: `https://raw.githubusercontent.com/aidfromdeagland/rslang-data/master/${dataForExample[this.audioContext]}`,
            audioWord: `https://raw.githubusercontent.com/aidfromdeagland/rslang-data/master/${dataForExample.audio}`,
            translationContext: dataForExample[`${this.context}Translate`],
            idWord: dataForExample.id,
            wordImage: `https://raw.githubusercontent.com/aidfromdeagland/rslang-data/master/${dataForExample.image}`,
            transcription: dataForExample.transcription
        };
        console.log(this.settings);
        this.setState({isLoadSettings: true});

    }

    checkWord = () => {
        const actualValue = this.prevValue.toLocaleLowerCase();
        const studiedWord = this.dataForCard.word;

        const word = studiedWord.split('').map((letter, index) => {
            return <span className={letter === actualValue[index] ? 'correct-letter' : 'uncorrect-letter'} key={index}>{letter}</span>;
        });
        return word;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const actualValue = this.state.valueInput.toLocaleLowerCase();

        if (actualValue === this.dataForCard.word) {
            this.setState({
                isCorrectWord: true,
            });

            this.playAudio(this.dataForCard.audioContext);
            return;
        }

        this.playAudio(this.dataForCard.audioWord);
        this.prevValue = this.state.valueInput;
        this.setState({
            isCorrectWord: false,
            valueInput: '',
        });
    }

    handleChange = (event) => {
        this.setState({
            isCorrectWord: null,
            valueInput: event.target.value,
        });
    }

    playAudio = (url) => {
        const audio = new Audio(url);
        audio.play();
    }

    handleClickShowAnswer = () => {
        this.setState({
            // isCorrectWord: true,
            valueInput: this.dataForCard.word,
        });
        this.playAudio(this.dataForCard.audioContext);
    }

    chooseLearnMethod = () => {
        const selectedSentence = (Object.keys(this.settings).slice(0, 3)).filter((setting) => this.settings[setting] === true);
        const min = 0;
        const max = selectedSentence.length - 1;
        const randomNumb = this.randomInteger(min, max);
        console.log(selectedSentence[randomNumb]);
        return selectedSentence[randomNumb];
    }

    randomInteger = (min, max) => {
        const rand = min - 0.5 + Math.random() * (max - min + 1);
        if (rand < 0) {
            return 0;
        }
        return Math.round(rand);
    }

    render() {
        if (this.state.isLoadSettings) {
            console.log(this.dataForCard)
            return (
                <div className="study-page">
                    <div className="card-container">
                        <section className="card">
                            <div className="hints-container">
                                <div className="img-container">
                                    {this.settings.showPicture
                                        && <img src={this.dataForCard.wordImage} alt="exampleImg" />}
                                </div>
                                <div className="transcription">
                                    {this.settings.showTranscription
                                        && <span>{this.dataForCard.transcription}</span>}
                                </div>
                                <div className="sentence-translation">
                                    <span>{this.dataForCard.translationContext}</span>
                                </div>
                            </div>
                            <div className="learn-content">
                                <div className="card-input">
                                    <Answer
                                        context={this.dataForCard.context}
                                        word={this.dataForCard.word}
                                        wordAudio={this.dataForCard.audioWord}
                                        contextAudio={this.dataForCard.audioContext}
                                        checkWord={this.checkWord}
                                        handleChange={this.handleChange}
                                        handleSubmit={this.handleSubmit}
                                        valueInput={this.state.valueInput}
                                        isCorrectWord={this.state.isCorrectWord}
                                    />
                                </div>
                                <div className="translation-container">
                                    <div className="translation">{this.dataForCard.wordTranslate}</div>
                                    <img className="dynamic-icon" src={dynamic} alt="dynamic" />
                                </div>
                            </div>
                            <div className="buttons-block">
                                <Button className="button delete-btn learn-btn" title="Delete" />
                                <Button className="button hard-btn learn-btn" title="Add to hard" />
                                <Button className="button answer-btn learn-btn" title="Show Answer" onClick={this.handleClickShowAnswer} />
                            </div>
                        </section>
                        <div className="navigate-next">
                            <img src={next} alt="next" />
                        </div>
                    </div>
                </div>
            );
        } else {
            return <Spinner />}
    }
}

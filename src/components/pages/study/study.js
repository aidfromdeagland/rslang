import React, { Component } from 'react';
import './study.scss';
import dynamic from '../../../assets/icons/dynamic.svg';
import next from '../../../assets/images/next-arrow.png';
import { Button } from '../../shared/button';
import { Answer } from './answer';
import { WordService } from '../../../services/wordServices';
import { SettingService } from '../../../services/settingServices';
import { Spinner } from '../../shared/spinner';

export class Study extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxWordsOfTheDay: 0,
            maxCardsOfTheDay: 0,
            wordCount: 0,
            valueInput: '',
            isCorrectWord: null,
            isLoadSettings: false,
            isLoadWords: false,
        };
    }

    async componentDidMount() {
        this.loadData();
        this.getSettings();
    }

    getSettings = async () => {
        const settings = await SettingService.get();
        this.settings = settings.optional;
        this.setState({
            maxWordsOfTheDay: this.settings.numberLearnWord,
            maxCardsOfTheDay: this.settings.numberLearnCard,
        });
        this.createCard();
        this.setState({ isLoadSettings: true });
    }

    createCard = () => {
        const { wordCount } = this.state;
        this.actualCard = this.words[wordCount];
        this.context = this.chooseLearnMethod();
        this.audioContext = `audio${this.context.slice(4)}` || 'audio';
        this.dataForCard = {
            context: this.actualCard[this.context],
            word: this.actualCard.word,
            wordTranslate: this.actualCard.wordTranslate,
            audioContext: `https://raw.githubusercontent.com/aidfromdeagland/rslang-data/master/${this.actualCard[this.audioContext]}`,
            audioWord: `https://raw.githubusercontent.com/aidfromdeagland/rslang-data/master/${this.actualCard.audio}`,
            translationContext: this.actualCard[`${this.context}Translate`],
            idWord: this.actualCard.id,
            wordImage: `https://raw.githubusercontent.com/aidfromdeagland/rslang-data/master/${this.actualCard.image}`,
            transcription: this.actualCard.transcription,
        };
    }

    loadData = async () => {
        this.words = await WordService.getWords(0, 0);
        this.setState({ isLoadWords: true });
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
        const { valueInput } = this.state;
        if (event) {
            event.preventDefault();
        }
        const actualValue = valueInput.toLocaleLowerCase();

        if (actualValue === this.dataForCard.word.toLocaleLowerCase()) {
            this.setState({
                isCorrectWord: true,
            });
            const audio = new Audio(this.dataForCard.audioContext);
            audio.play();
            audio.addEventListener('ended', () => {
                this.setState((prev) => ({
                    wordCount: prev.wordCount + 1,
                }));
                this.createCard();
                this.setState({
                    isCorrectWord: null,
                    valueInput: '',
                });
            });
        } else {
            const audio = new Audio(this.dataForCard.audioWord);
            audio.play();
            this.prevValue = valueInput;
            this.setState({
                isCorrectWord: false,
                valueInput: '',
            });
        }
    }

    handleChange = (event) => {
        this.setState({
            isCorrectWord: null,
            valueInput: event.target.value,
        });
    }

    handleClickShowAnswer = () => {
        this.setState({
            valueInput: this.dataForCard.word,
        });
        const audio = new Audio(this.dataForCard.audioContext);
        audio.play();
    }

    chooseLearnMethod = () => {
        const selectedSentence = (Object.keys(this.settings).slice(0, 3)).filter((setting) => this.settings[setting] === true);
        const min = 0;
        const max = selectedSentence.length - 1;
        const randomNumb = this.randomInteger(min, max);
        console.log(selectedSentence[randomNumb])
        return selectedSentence[randomNumb];
    }

    randomInteger = (min, max) => {
        const rand = min - 0.5 + Math.random() * (max - min + 1);
        if (rand < 0) {
            return 0;
        }
        return Math.round(rand);
    }

    handleClickNext = (e) => {
        this.handleSubmit(e);
    }

    render() {
        const {
            isLoadSettings, isLoadWords, valueInput, isCorrectWord,
        } = this.state;
        if (isLoadSettings && isLoadWords) {
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
                                        valueInput={valueInput}
                                        isCorrectWord={isCorrectWord}
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
                            <Button className="btn-next-card" onClick={(e) => this.handleClickNext(e)}>
                                <img src={next} alt="next" />
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }
        return <Spinner />;
    }
}

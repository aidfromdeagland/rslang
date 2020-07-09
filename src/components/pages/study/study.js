import React, { Component } from 'react';
import './study.scss';
import dynamic from '../../../assets/icons/dynamic.svg';
import next from '../../../assets/images/next-arrow.png';
import { Button } from '../../shared/button';
import { Answer } from './answer';
import { WordService } from '../../../services/wordServices';
import { SettingService } from '../../../services/settingServices';
import { Spinner } from '../../shared/spinner';
import { Progress } from './progress';

const audioPrefixMap = {
    showWordTranslate: 'audio',
    showSentenceMeaning: 'audioMeaning',
    showSentenceExample: 'audioExample',
};

const contextMap = {
    showWordTranslate: 'word',
    showSentenceMeaning: 'textMeaning',
    showSentenceExample: 'textExample',
};

export class Study extends Component {
    constructor(props) {
        super(props);
        this.state = {
            learnedWordsQuantity: 0,
            needToLearnWordsQuantity: 0,
            totalLearnedWordsQuantity: 0,
            wordCount: 0,
            valueInput: '',
            isCorrectWord: null,
            isLoadSettings: false,
            isLoadWords: false,
            isFirstTry: true,
            showEvaluation: false,
            isSubmitable: true,
            isAudioFinished: false,
        };

        this.audioPlayer = new Audio();
    }

    componentDidMount() {
        this.getSettings();
    }

    getSettings = async () => {
        const settings = await SettingService.get();
        this.settings = settings.optional;
        console.log(this.settings);
        const wordsAggResponse = await WordService.getUserAggWords(undefined, '', 5);
        this.words = wordsAggResponse[0].paginatedResults;
        this.createCard();
        this.setState({
            isLoadWords: true,
            isLoadSettings: true,
            needToLearnWordsQuantity: this.settings.totalWords,
        });
    }

    createCard = () => {
        const { wordCount } = this.state;
        this.actualCard = this.words[wordCount];
        this.context = this.chooseLearnMethod();
        this.audioContext = audioPrefixMap[this.context];
        this.dataForCard = {
            context: this.actualCard[contextMap[this.context]],
            word: this.actualCard.word,
            wordTranslate: this.actualCard.wordTranslate,
            audioContext: `https://raw.githubusercontent.com/aidfromdeagland/rslang-data/master/${this.actualCard[this.audioContext]}`,
            audioWord: `https://raw.githubusercontent.com/aidfromdeagland/rslang-data/master/${this.actualCard.audio}`,
            translationContext: this.actualCard[`${contextMap[this.context]}Translate`],
            idWord: this.actualCard.id,
            wordImage: `https://raw.githubusercontent.com/aidfromdeagland/rslang-data/master/${this.actualCard.image}`,
            transcription: this.actualCard.transcription,
        };
    }

    checkWord = () => {
        const actualValue = this.prevValue.toLocaleLowerCase();
        const studiedWord = this.dataForCard.word;

        const word = studiedWord.split('').map((letter, index) => (
            <span
                className={letter === actualValue[index]
                    ? 'correct-letter check-letter'
                    : 'incorrect-letter check-letter'}
                key={index}
            >
                {letter}
            </span>
        ));
        return word;
    }

    handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }
        const { valueInput } = this.state;
        const actualValue = valueInput.toLocaleLowerCase();

        if (this.state.isSubmitable) {
            if (actualValue === this.dataForCard.word.toLocaleLowerCase()) {
                if (this.state.isFirstTry) {
                    this.setState({ showEvaluation: true });
                    console.log('GOOD TRY');
                } else {
                    this.words.push(this.words[this.state.wordCount]);
                    console.log(this.words);
                }
                this.audioPlayer.src = this.dataForCard.audioContext;
                this.audioPlayer.play();
                this.setState({
                    isCorrectWord: true,
                    isSubmitable: false,
                    isAudioFinished: false,
                });

                this.audioPlayer.addEventListener('ended', () => {
                    if (this.state.showEvaluation === false) {
                        if (this.state.wordCount < this.words.length - 1) {
                            this.setState((prev) => ({
                                wordCount: prev.wordCount + 1,
                            }));
                            this.createCard();
                            this.setState({
                                isCorrectWord: null,
                                valueInput: '',
                                isFirstTry: true,
                                isSubmitable: true,
                            });
                        } else {
                            alert('FINISH!');
                        }
                    }
                    this.setState({ isAudioFinished: true });
                }, { once: true });
            } else {
                this.audioPlayer.src = this.dataForCard.audioWord;
                this.audioPlayer.play();
                this.prevValue = valueInput;
                this.setState({
                    isCorrectWord: false,
                    valueInput: '',
                    isFirstTry: false,
                });
            }
        }
    }

    handleEvaluate = () => {
        if (this.state.isAudioFinished) {
            if (this.state.wordCount < this.words.length - 1) {
                this.setState((prev) => ({
                    wordCount: prev.wordCount + 1,
                }));
                this.createCard();
                this.setState({
                    isCorrectWord: null,
                    valueInput: '',
                    isFirstTry: true,
                    isSubmitable: true,
                });
            } else {
                alert('FINISH');
            }
        }
        this.setState({ showEvaluation: false });
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
            isFirstTry: false,
        });
    }

    chooseLearnMethod = () => {
        const { showWordTranslate, showSentenceMeaning, showSentenceExample } = this.settings;
        const cardRenderVarieties = { showWordTranslate, showSentenceMeaning, showSentenceExample };
        const selectredVariants = Object.keys(cardRenderVarieties).filter((setting) => this.settings[setting] === true);
        const min = 0;
        const max = selectredVariants.length - 1;
        const randomNumb = this.randomInteger(min, max);
        return selectredVariants[randomNumb];
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
            isLoadSettings, isLoadWords, valueInput, isCorrectWord, showEvaluation, learnedWordsQuantity, needToLearnWordsQuantity, totalLearnedWordsQuantity,
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
                                        showEvaluation={showEvaluation}
                                        handleEvaluate={this.handleEvaluate}
                                        currentWord={this.words[this.state.wordCount]}
                                    />
                                </div>
                                {
                                    /* <div className="translation-container">
                                    <div className="translation">{this.dataForCard.wordTranslate}</div>
                                    <img className="dynamic-icon" src={dynamic} alt="dynamic" />
                                </div> */
                                }
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
                    <Progress learnedWordsQuantity={learnedWordsQuantity} needToLearnWordsQuantity={needToLearnWordsQuantity} totalLearned={totalLearnedWordsQuantity} />
                </div>
            );
        }
        return <Spinner />;
    }
}

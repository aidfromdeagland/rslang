import React, { Component } from 'react';
import './study.scss';
import next from '../../../assets/images/next-arrow.png';
import { Button } from '../../shared/button';
import { Answer } from './answer';
import { WordService } from '../../../services/wordServices';
import { SettingService } from '../../../services/settingServices';
import { Spinner } from '../../shared/spinner';
import { Progress } from './progress';

const totalLearnedWordsQuery = { 'userWord.optional.isDeleted': false };
const totalDifficultWordsQuery = { $and: [{ 'userWord.optional.isDeleted': false, 'userWord.optional.isDifficult': true }] };

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
        };

        this.audioPlayer = new Audio();
    }

    componentDidMount() {
        this.startTraining();
    }

    componentWillUnmount() {

    }

    getSettings = async () => {
        const settings = await SettingService.get();
        const settingsToWork = settings.optional;
        return settingsToWork;
    }

    getWords = async () => {
        const { allowNewWords, allowLearnedWords, allowDifficultWords } = this.props.location;
        const newWordsQuery = { userWord: null };
        const todayMidnightDate = new Date(Date.now()).setHours(23, 59, 59, 999);
        const learnedWordsDateLimitedQuery = { $and: [{ 'userWord.optional.isDeleted': false, 'userWord.optional.nextDate': { $lt: todayMidnightDate } }] };

        let newWordsforTraining = [];
        if (this.settings.newWords && allowNewWords) {
            const newWordsQuantity = this.settings.newWords;
            const newWordsAggResponse = await WordService.getUserAggWords(
                '', newWordsQuery, newWordsQuantity,
            );
            newWordsforTraining = newWordsAggResponse[0].paginatedResults;
        }
        let learnedWordsForTraining = [];
        if ((this.settings.totalWords - this.settings.newWords > 0) && allowLearnedWords) {
            let learnedWordsAggResponse;
            const learnedWordsQuantity = this.settings.totalWords - this.settings.newWords;
            if (allowDifficultWords) {
                learnedWordsAggResponse = await WordService.getUserAggWords(
                    '', totalDifficultWordsQuery, learnedWordsQuantity,
                );
                learnedWordsForTraining = learnedWordsAggResponse[0].paginatedResults;
            } else {
                learnedWordsAggResponse = await WordService.getUserAggWords(
                    '', learnedWordsDateLimitedQuery, learnedWordsQuantity,
                );
                learnedWordsForTraining = learnedWordsAggResponse[0].paginatedResults;
            }
        }

        return newWordsforTraining.concat(learnedWordsForTraining);
    }

    getTotalWordsQuantity = async () => {
        const totalLearnedWordsAggResponse = await WordService.getUserAggWords('', totalLearnedWordsQuery, 1);
        return totalLearnedWordsAggResponse[0].totalCount.length
            ? totalLearnedWordsAggResponse[0].totalCount[0].count
            : 0;
    }

    startTraining = async () => {
        this.settings = await this.getSettings();
        const [words, totalLearnedWordsQuantity] = await Promise.all([this.getWords(), this.getTotalWordsQuantity()]);
        this.words = words;
        this.totalLearnedWordsQuantity = totalLearnedWordsQuantity;
        if (this.words.length) {
            this.createCard();
            this.setState({
                isLoadWords: true,
                isLoadSettings: true,
                needToLearnWordsQuantity: this.words.length,
                totalLearnedWordsQuantity: this.totalLearnedWordsQuantity,
            });
        } else {
            this.props.history.push('/main');
            alert('no words for training. change your settings');
        }
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

    pushWord = () => {
        this.words.push(this.words[this.state.wordCount]);
    }

    handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }
        console.log(this.words);
        const { valueInput } = this.state;
        const actualValue = valueInput.toLocaleLowerCase();

        if (actualValue === this.dataForCard.word.toLocaleLowerCase()) {
            if (this.state.isFirstTry) {
                this.audioPlayer.src = this.dataForCard.audioContext;
                this.setState({ showEvaluation: true });
                if (this.settings.autoPronunciation) {
                    this.audioPlayer.play();
                }
                console.log('GOOD TRY');
            } else {
                this.setState({
                    isCorrectWord: true,
                });
                if (this.settings.autoPronunciation) {
                    this.audioPlayer.src = this.dataForCard.audioContext;
                    this.audioPlayer.play();
                    this.audioPlayer.addEventListener('ended', () => {
                        this.pushWord();
                        this.goNextCard();
                    }, { once: true });
                } else {
                    this.pushWord();
                    this.goNextCard();
                }
            }

            /* this.audioPlayer.addEventListener('ended', () => {
                    if (this.state.showEvaluation === false) {
                        if (this.state.isFirstTry) {
                            this.setState((prev) => ({
                                learnedWordsQuantity: prev.learnedWordsQuantity + 1,
                                totalLearnedWordsQuantity: prev.totalLearnedWordsQuantity + 1,
                            }));
                        }
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
                            alert('FINISH! / STATISTICS');
                            this.props.history.push('/main');
                        }
                    }
                    this.setState({ isAudioFinished: true });
                }, { once: true }); */
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

    goNextCard = () => {
        this.setState((prev) => ({
            wordCount: prev.wordCount + 1,
        }));
        this.audioPlayer.pause();
        this.createCard();
        this.setState({
            isCorrectWord: null,
            valueInput: '',
            isFirstTry: true,
        });
    }

    handleEvaluate = () => {
        if (this.state.wordCount < this.words.length - 1) {
            this.goNextCard();
        } else {
            this.props.history.push('/main');
            alert('FINISH / STATISTICS');
        }
        this.setState((prev) => ({
            showEvaluation: false,
            learnedWordsQuantity: prev.learnedWordsQuantity + 1,
            totalLearnedWordsQuantity: prev.totalLearnedWordsQuantity + 1,
        }));
    }

    handleRepeatEvaluate = () => {
        setTimeout(() => {
            this.pushWord();
            this.goNextCard();
            this.setState({ showEvaluation: false });
        }, 0);
    }

    handleClickToDifficult = () => {
        console.log(this.words[this.state.wordCount]);
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
        const selectredVariants = Object.keys(cardRenderVarieties)
            .filter((setting) => this.settings[setting] === true);
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
            isLoadSettings, isLoadWords, valueInput, isCorrectWord, showEvaluation,
            learnedWordsQuantity, needToLearnWordsQuantity, totalLearnedWordsQuantity,
        } = this.state;
        if (this.props.location.allowNewWords === undefined
            || this.props.location.allowLearnedWords === undefined
            || this.props.location.allowDifficultWords === undefined) {
            this.props.history.push('/main');
        }

        if (isLoadSettings && isLoadWords) {
            return (
                <div className="study-page">
                    <div className="card-container">
                        <section className="card">
                            <div className="hints-container">
                                <div className="img-container">
                                    {this.settings.showWordImage
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
                                        handleRepeatEvaluate={this.handleRepeatEvaluate}
                                        currentWord={this.words[this.state.wordCount]}
                                    />
                                </div>
                            </div>
                            <div className="buttons-block">
                                {this.settings.showDeleteButton
                                && (
                                    <Button
                                        className="button delete-btn learn-btn"
                                        title="delete"
                                        isDisabled={showEvaluation}
                                        onClick={() => { console.log('DELETED!', this.words); }}
                                    />
                                )}

                                {this.settings.showDifficultButton
                                && (
                                    <Button
                                        className="button hard-btn learn-btn"
                                        title="difficult"
                                        isDisabled={showEvaluation}
                                        onClick={() => { console.log('DIFFICULT!', this.words); }}
                                    />
                                )}
                                {this.settings.showAnswerButton
                                && (
                                    <Button
                                        className="button answer-btn learn-btn"
                                        title="Show Answer"
                                        onClick={this.handleClickShowAnswer}
                                        isDisabled={showEvaluation}
                                    />
                                )}
                            </div>
                        </section>
                        <div className="navigate-next">
                            <Button className="btn-next-card" onClick={(e) => this.handleClickNext(e)} isDisabled={showEvaluation}>
                                <img src={next} alt="next" />
                            </Button>
                        </div>
                    </div>
                    <Progress
                        learnedWordsQuantity={learnedWordsQuantity}
                        needToLearnWordsQuantity={needToLearnWordsQuantity}
                        totalLearnedWordsQuantity={totalLearnedWordsQuantity}
                    />
                </div>
            );
        }
        return <Spinner />;
    }
}

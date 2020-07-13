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

const tagPlusContentReg = new RegExp('<b>(.*?)</b>|<i>(.*?)</i>');

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
            wordToCompare: this.actualCard.word,
            wordTranslate: this.actualCard.wordTranslate,
            audioContext: `https://raw.githubusercontent.com/aidfromdeagland/rslang-data/master/${this.actualCard[this.audioContext]}`,
            audioWord: `https://raw.githubusercontent.com/aidfromdeagland/rslang-data/master/${this.actualCard.audio}`,
            translationContext: this.actualCard[`${contextMap[this.context]}Translate`],
            idWord: this.actualCard.id,
            wordImage: `https://raw.githubusercontent.com/aidfromdeagland/rslang-data/master/${this.actualCard.image}`,
            transcription: this.actualCard.transcription,
        };
        if (this.context === 'showSentenceMeaning' || this.context === 'showSentenceExample') {
            this.dataForCard.wordToCompare = this.dataForCard.context.match(tagPlusContentReg)[0].replace(/(<(\/?[^>]+)>)/g, '').trim();
        }
    };

    checkWord = () => {
        const actualValue = this.prevValue.toLowerCase();
        const studiedWord = this.dataForCard.wordToCompare;

        const word = studiedWord.split('').map((letter, index) => (
            <span
                className={letter.toLowerCase() === actualValue[index]
                    ? 'correct-letter check-letter'
                    : 'incorrect-letter check-letter'}
                key={index}
            >
                {letter}
            </span>
        ));
        return word;
    }

    pushWordToEnd = () => {
        this.words.push(this.words[this.state.wordCount]);
    }

    handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }
        const { valueInput } = this.state;
        const actualValue = valueInput.toLowerCase();

        if (actualValue === this.dataForCard.wordToCompare.toLowerCase()) {
            if (!this.state.showEvaluation) {
                if (this.state.isFirstTry) {
                    this.audioPlayer.src = this.dataForCard.audioContext;
                    this.setState({ showEvaluation: true });
                    if (this.settings.autoPronunciation) {
                        this.audioPlayer.play();
                        this.audioPlayer.addEventListener('ended', () => {
                            if (!this.state.showEvaluation) {
                                this.goNextCard();
                            }
                        }, { once: true });
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
                            this.pushWordToEnd();
                            this.goNextCard();
                        }, { once: true });
                    } else {
                        this.pushWordToEnd();
                        this.goNextCard();
                    }
                }
            }
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
        if (this.state.wordCount < this.words.length - 1) {
            this.state.wordCount += 1;
            this.audioPlayer.pause();
            this.createCard();
            this.setState({
                isCorrectWord: null,
                valueInput: '',
                isFirstTry: true,
            });
        } else {
            alert('FINISH!');
            this.props.history.push('/main');
        }
    }

    handleEvaluate = () => {
        if (this.settings.autoPronunciation) {
            if (this.audioPlayer.ended) {
                this.goNextCard();
            }
        } else {
            this.goNextCard();
        }
        this.setState((prev) => ({
            showEvaluation: false,
            learnedWordsQuantity: prev.learnedWordsQuantity + 1,
            totalLearnedWordsQuantity: prev.totalLearnedWordsQuantity + 1,
        }));
    }

    handleRepeatEvaluate = () => {
        setTimeout(() => {
            this.pushWordToEnd();
            this.goNextCard();
            this.setState({ showEvaluation: false });
        }, 0);
    }

    handleToggleDifficultyStatus = () => {
        const currentTimeStamp = Date.now();
        if (this.actualCard.userWord) {
            const {
                isDeleted, isDifficult, debutDate, repeats,
            } = this.actualCard.userWord.optional;

            const actualWordPutTemplate = {
                optional: {
                    isDeleted,
                    isDifficult: !isDifficult,
                    debutDate,
                    prevDate: currentTimeStamp,
                    nextDate: currentTimeStamp,
                    repeats,
                },
            };

            WordService.putWord(this.actualCard.id, actualWordPutTemplate);
        } else {
            const defaultWordPostTemplate = {
                optional: {
                    isDeleted: false,
                    isDifficult: true,
                    debutDate: currentTimeStamp,
                    prevDate: currentTimeStamp,
                    nextDate: currentTimeStamp,
                    repeats: 0,
                },
            };

            WordService.postWord(this.actualCard.id, defaultWordPostTemplate);
        }
        this.goNextCard();
    }

    handleToggleDeleteStatus = () => {
        const currentTimeStamp = Date.now();
        if (this.actualCard.userWord) {
            const {
                isDeleted, isDifficult, debutDate, repeats,
            } = this.actualCard.userWord.optional;

            const actualWordPutTemplate = {
                optional: {
                    isDeleted: !isDeleted,
                    isDifficult,
                    debutDate,
                    prevDate: currentTimeStamp,
                    nextDate: currentTimeStamp,
                    repeats,
                },
            };

            WordService.putWord(this.actualCard.id, actualWordPutTemplate);
        } else {
            const defaultWordPostTemplate = {
                optional: {
                    isDeleted: false,
                    isDifficult: true,
                    debutDate: currentTimeStamp,
                    prevDate: currentTimeStamp,
                    nextDate: currentTimeStamp,
                    repeats: 0,
                },
            };

            WordService.postWord(this.actualCard.id, defaultWordPostTemplate);
        }
        this.goNextCard();
    }

    handleChange = (event) => {
        this.setState({
            isCorrectWord: null,
            valueInput: event.target.value,
        });
    }

    handleClickShowAnswer = () => {
        this.setState({
            valueInput: this.dataForCard.wordToCompare,
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
            const cardDifficultState = this.actualCard.userWord && this.actualCard.userWord.optional.isDifficult
            return (
                <div className="study-page">
                    <div className="card-container">
                        <section className={cardDifficultState ? 'card card_difficult' : 'card'}>
                            <div className="hints-container">
                                <div className="img-container">
                                    {this.settings.showWordImage
                                        && <img className="card__image" src={this.dataForCard.wordImage} alt="illustration" />}
                                </div>
                                <div className="transcription">
                                    {this.settings.showWordTranscription
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
                                        word={this.dataForCard.wordToCompare}
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
                                        onClick={this.handleToggleDeleteStatus}
                                    />
                                )}

                                {this.settings.showDifficultButton
                                && (
                                    <Button
                                        className="button hard-btn learn-btn"
                                        title="difficult"
                                        isDisabled={showEvaluation || cardDifficultState}
                                        onClick={this.handleToggleDifficultyStatus}
                                    />
                                )}
                                {this.settings.showAnswerButton
                                && (
                                    <Button
                                        className="button answer-btn learn-btn"
                                        title="answer"
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

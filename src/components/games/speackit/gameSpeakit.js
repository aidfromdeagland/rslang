import React, { Component } from 'react';
import './startPage.scss';
import PropTypes from 'prop-types';
import { ItemWord } from './itemWord';
import './sass/blocks/card.scss';
import './sass/scaffolding.scss';
import './sass/blocks/cards.scss';
import './sass/blocks/content.scss';
import './sass/blocks/main.scss';
import './sass/blocks/scene.scss';
import question from '../../../assets/images/speakit/question-mark.png';
import { Dropdown } from './dropdown/dropDown';

// import { Dropdown } from './dropDown/DropDown';
// import { Checkbox } from './checkBox/checkBox';
import { WordService } from '../../../services/wordServices';
import { Spinner } from '../../shared/spinner';
// import './game-puzzle.scss';
// import { GameBoardAction } from './gameBoardAction';
// import { ButtonsBlock } from './buttonsGame';
// import { ModalResult } from './modalStatistics/modalResult';
import { SettingService } from '../../../services/settingServices';
import { settingsDefault } from '../../../constants/globalConstants';
// import { StatisticService } from '../../../services/statisticServices';

export class GameSpeakit extends Component {
    constructor(props) {
        super(props);
        // this.statistic = [];
        // this.results = {
        //     know: [],
        //     dontKnow: [],
        // };
        this.state = {
            level: 1,
            page: 1,
            wordCount: 0,
            haveWords: false,
            dataForGame: [],
            gameMode: 'train',
            isClickedCard: false,
            indexClickedCard: null,

            //     isCheckBtn: false,
            //     isContinueBtn: false,
            //     isDontKnowBtn: true,
            //     isResultBtn: false,
            //     isClickedDontKnow: false,
            //     isAutoPronunciation: true,
            //     isPicture: true,
            //     isRoundEnd: false,
            //     isNext: true,
        };
    }

    componentDidMount() {
        const { haveWords } = this.state;
        if (!haveWords) {
            this.loadSettings();
            // this.loadStatistic();
        }
    }

    // componentDidUpdate() {
    //     const {
    //         haveWords,
    //         isNext,
    //         wordCount,
    //     } = this.state;
    //     if (!haveWords) {
    //         this.loadWords();
    //     }
    //     if (!isNext) {
    //         this.createDataForGame(wordCount);
    //     }
    // }

    loadSettings = async () => {
        this.settings = await SettingService.get();
        const settingsForGame = this.settings.optional.speakit
            ? JSON.parse(this.settings.optional.speakit)
            : JSON.parse(settingsDefault.optional.speakit);
        this.setState({
            level: settingsForGame.group,
            page: settingsForGame.page,
        });
        this.loadWords();
    }

    // putSettings = (level, page) => {
    //     const { optional } = this.settings;
    //     const gameSettings = JSON.stringify({
    //         level,
    //         page,
    //     });
    //     optional.gamePuzzle = gameSettings;
    //     const settings = SettingService.createObject(this.settings.wordsPerDay, optional);
    //     SettingService.put(settings);
    // }

    // loadStatistic = async () => {
    //     this.statistic = await StatisticService.get();
    //     this.gameStatistic = this.statistic.optional.gamePuzzle
    //         ? JSON.parse(this.statistic.optional.gamePuzzle)
    //         : [];
    // }

    // putStatistic = () => {
    //     const { optional } = this.statistic;
    //     const gameStatistic = JSON.stringify(this.gameStatistic);
    //     optional.gamePuzzle = gameStatistic;
    //     const statistic = StatisticService.createObject(this.statistic.learnedWords, optional);
    //     StatisticService.put(statistic);
    // }

    // addStatisticsData = (level, page) => {
    //     const options = {
    //         day: 'numeric',
    //         month: 'long',
    //         hour: 'numeric',
    //         minute: 'numeric',
    //         second: 'numeric',
    //         hour12: false,
    //     };
    //     const date = new Date();
    //     const dateString = date.toLocaleString('en', options);
    //     const timeStamp = date.getTime();
    //     const statisticsField = {
    //         date: timeStamp,
    //         group: level,
    //         page,
    //         incorrect: this.results.dontKnow.length,
    //         correct: this.results.know.length,
    //     };
    //     this.gameStatistic.push(statisticsField);
    //     this.putStatistic();
    // }

    loadWords = async () => {
        const {
            isGameWithUserWords,
            isGameWithLevels,
        } = this.props;
        const {
            level,
            page,
            wordCount,
        } = this.state;
        if (isGameWithLevels) {
            const calculatingPage = Math.floor((page - 1) / 2);
            const calculatingLevel = level - 1;
            this.allWords = await WordService.getWords(calculatingLevel, calculatingPage);
        }
        if (isGameWithUserWords) {
            const data = await WordService.getUserWords();
            this.allWords = this.getRandomData(data);
        }
        this.createDataForGame(wordCount);
        this.setState({ haveWords: true });
    }

    createDataForGame = (wordCount) => {
        const {
            isGameWithUserWords,
            isGameWithLevels,
        } = this.props;
        const {
            page,
        } = this.state;
        let dataForGameRound;
        if (isGameWithLevels) {
            dataForGameRound = (page - 1) % 2 === 0
                ? this.allWords.slice(0, 10)
                : this.allWords.slice(10, 20);
        }
        if (isGameWithUserWords) {
            dataForGameRound = this.allWords.slice();
        }

        console.log(dataForGameRound)
        this.filterData = dataForGameRound.map((data) => ({
            word: data.word,
            wordTranslate: data.wordTranslate,
            wordAudio: data.audio,
            wordTranscription: data.transcription,
            wordId: data.id,
            wordImage: data.image,
        }));
        console.log(this.filterData)
        // this.wordsTranslate = dataForGameRound.map((data) => data.wordTranslate);
        // this.wordsAudio = dataForGameRound.map((data) => data.audio);
        // this.wordsTranscription = dataForGameRound.map((data) => data.transcription);
        // this.sentence = wordsForGameRound[wordCount].textExample.replace(/(<([^>]+)>)/g, '');
        // this.sentenceForPuzzle = this.mixWords(this.sentence);
        // this.translateSentence = wordsForGameRound[wordCount].textExampleTranslate;
        // this.audioSentence = wordsForGameRound[wordCount].audioExample;
        // this.image = wordsForGameRound[wordCount].image;
        this.setState({
            dataForGame: this.filterData,
            // sentence: this.sentence,
            // sentenceForPuzzle: this.sentenceForPuzzle,
            // translateSentence: this.translateSentence,
            // audioSentence: this.audioSentence,
            // image: this.image,
            // isNext: true,
        });
    }

    // mixWords = (sentence) => {
    //     const newSentence = sentence.split(' ');
    //     const randomSentence = [];
    //     for (let i = newSentence.length - 1; i >= 0; i -= 1) {
    //         const randomIndex = this.randomInteger(0, i);
    //         randomSentence.push(newSentence[randomIndex]);
    //         newSentence.splice(randomIndex, 1);
    //     }
    //     return randomSentence.join(' ');
    // }

    // getRandomData = (data) => {
    //     const newData = data.slice();
    //     const randomData = [];
    //     for (let i = 9; i >= 0; i -= 1) {
    //         const randomIndex = this.randomInteger(0, newData.length - 1);
    //         randomData.push(newData[randomIndex]);
    //         newData.splice(randomIndex, 1);
    //     }
    //     return randomData;
    // }

    // randomInteger = (min, max) => {
    //     const rand = min - 0.5 + Math.random() * (max - min + 1);
    //     return Math.round(rand);
    // }

    // showButton = (name, boolean) => {
    //     this.setState({ [name]: boolean });
    // }

    // clickDontKnow = () => {
    //     this.setState({ isClickedDontKnow: true });
    // }

    // getNextWord = (count) => {
    //     this.setState({
    //         wordCount: count,
    //         isCheckBtn: false,
    //         isContinueBtn: false,
    //         isDontKnowBtn: true,
    //         isResultBtn: false,
    //         isNext: false,
    //     });
    // }

    // selectLevel = (level, page) => {
    //     const {
    //         isGameWithUserWords,
    //         isGameWithLevels,
    //     } = this.props;
    //     if (isGameWithLevels) {
    //         this.setState({
    //             level,
    //             page,
    //             haveWords: false,
    //             wordCount: 0,
    //             isCheckBtn: false,
    //             isContinueBtn: false,
    //             isDontKnowBtn: true,
    //             isResultBtn: false,
    //         });
    //     }
    //     if (isGameWithUserWords) {
    //         this.setState(() => ({
    //             wordCount: 0,
    //             isCheckBtn: false,
    //             isContinueBtn: false,
    //             isDontKnowBtn: true,
    //             isResultBtn: false,
    //             haveWords: false,
    //         }));
    //     }
    //     this.results.know = [];
    //     this.results.dontKnow = [];
    //     this.putSettings(level, page);
    // }

    // checkBoxHandle = (prop) => {
    //     this.setState((prev) => ({
    //         [prop]: !prev[prop],
    //     }));
    // }

    // addToResults = (result, sentence, audioUrl) => {
    //     this.results[result].push({ sentence, audioUrl });
    // }

    // showResults = () => {
    //     const { level, page } = this.state;
    //     this.setState({ isRoundEnd: true });
    //     this.addStatisticsData(level, page);
    // }

    // handleByNextRound = () => {
    //     const {
    //         level,
    //         page,
    //     } = this.state;
    //     this.setState({ isRoundEnd: false });
    //     if (level === 6 && page === 60) {
    //         this.selectLevel(1, 1);
    //     }
    //     if (page < 60) {
    //         this.selectLevel(level, parseFloat(page) + 1);
    //     } else {
    //         this.selectLevel(level + 1, 1);
    //     }
    //     this.results.know = [];
    //     this.results.dontKnow = [];
    // }

    handleClickCard = (index, audioUrl, imageUrl, translate) => {
        console.log('asd')
        this.setState({
            isClickedCard: true,
            indexClickedCard: index,
            activeAudioUrl: `https://raw.githubusercontent.com/aidfromdeagland/rslang-data/master/${audioUrl}`,
            activeImageUrl: `https://raw.githubusercontent.com/aidfromdeagland/rslang-data/master/${imageUrl}`,
            activeTranslate: translate,
        });
    }

    render() {
        const {
            haveWords,
            dataForGame,
            indexClickedCard,
            isClickedCard,
            activeAudioUrl,
            activeImageUrl,
            activeTranslate,
            //     sentence,
            //     sentenceForPuzzle,
            //     translateSentence,
            //     audioSentence,
            //     isNext,
            //     isRoundEnd,
            level,
            page,
            //     isAutoPronunciation,
            //     isPicture,
            //     image,
            //     isClickedDontKnow,
            //     wordCount,
            //     isContinueBtn,
            //     isCheckBtn,
            //     isDontKnowBtn,
            //     isResultBtn,

        } = this.state;
        const {
            isGameWithLevels,
        } = this.props;
        if (haveWords) {
            return (
                <div>
                    <div className="game-speakit__header">
                        {isGameWithLevels && (
                            <Dropdown
                                selectLevel={this.selectLevel}
                                level={level}
                                page={page}
                            />
                        )}
                    </div>
                    <div className="content">
                        <span className="content__points"> </span>
                        <ul className="cards-container">
                            <li className="scene">
                                <img className="scene__image" alt="image" src={isClickedCard ? activeImageUrl : question} />
                                <p className="scene__translation">{activeTranslate}</p>
                            </li>
                            {dataForGame.map((wordData, index) => (
                                <ItemWord
                                    key={wordData.wordId}
                                    wordData={wordData}
                                    // onClick={() => this.handleClickCard(index)}
                                    cardIndex={index}
                                    indexClickedCard={indexClickedCard}
                                    isClickedCard={isClickedCard}
                                    handleClickCard={this.handleClickCard}
                                    activeAudioUrl={activeAudioUrl}
                                    activeImageUrl={activeImageUrl}
                                />
                            ))}
                        </ul>
                        <button className="button content__button content__button_speak">speak</button>
                    </div>
                </div>
            );
        }
        return <Spinner />;
    }
}

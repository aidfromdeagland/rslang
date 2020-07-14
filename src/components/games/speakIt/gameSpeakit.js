import React, { Component } from 'react';
import './startPage.scss';
// import PropTypes from 'prop-types';
import { ItemWord } from './itemWord';
import question from '../../../assets/images/speakit/question-mark.png';
import { Dropdown } from './dropdown/dropDown';
import { WordService } from '../../../services/wordServices';
import { Spinner } from '../../shared/spinner';
import { ModalResult } from './modalResult/modalResult';
import { SettingService } from '../../../services/settingServices';
import { settingsDefault } from '../../../constants/globalConstants';
import { StatisticService } from '../../../services/statisticServices';
import { Button } from '../../shared/button';
import { getMemoInfoMiniGames } from '../../../services/spacedRepetition';
import { convertStatisticJson } from '../../../utils/utils';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
recognition.grammars = speechRecognitionList;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.continuous = false;
recognition.maxAlternatives = 3;

export class GameSpeakit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            level: 1,
            page: 1,
            haveWords: false,
            dataForGame: [],
            isGameModeTrain: true,
            isClickedCard: false,
            indexClickedCard: null,
            listening: false,
            totalSpokenWords: 0,
            correctWords: [],
            isRoundEnd: false,
        };
    }

    componentDidMount() {
        const { haveWords } = this.state;
        if (!haveWords) {
            this.loadSettings();
            this.loadStatistic();
        }
    }

    componentDidUpdate() {
        const {
            haveWords,
        } = this.state;
        if (!haveWords) {
            this.loadWords();
        }
    }

    componentWillUnmount() {
        recognition.stop();
        recognition.onend = () => {
            recognition.stop();
        };
    }

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

    putSettings = (level, page) => {
        const { optional } = this.settings;
        const gameSettings = JSON.stringify({
            group: level,
            page,
        });
        optional.speakit = gameSettings;
        const settings = SettingService.createObject(this.settings.wordsPerDay, optional);
        SettingService.put(settings);
    }

    loadStatistic = async () => {
        this.statistic = await StatisticService.get();
        this.gameStatistic = this.statistic.optional.speakit
            ? JSON.parse(this.statistic.optional.speakit)
            : [];
    }

    putStatistic = () => {
        const gameStatistic = convertStatisticJson(this.gameStatistic);
        this.statistic.optional.speakit = gameStatistic;
        StatisticService.put(this.statistic);
    }

    addStatisticsData = () => {
        const {
            totalSpokenWords,
            correctWords,
        } = this.state;
        const statisticsField = StatisticService.createGameStat(correctWords.length, totalSpokenWords - correctWords.length);
        this.gameStatistic.push(statisticsField);
        this.putStatistic();
    }

    loadWords = async () => {
        const {
            isGameWithUserWords,
            isGameWithLevels,
        } = this.props;
        const {
            level,
            page,
        } = this.state;
        if (isGameWithLevels) {
            const calculatingPage = Math.floor((page - 1) / 2);
            const calculatingLevel = level - 1;
            this.allWords = await WordService.getWords(calculatingLevel, calculatingPage);
        }
        if (isGameWithUserWords) {
            const totalLearnedWordsQuery = { 'userWord.optional.isDeleted': false };
            const wordsResponse = await WordService.getUserAggWords('', totalLearnedWordsQuery, 3600);
            const userWords = wordsResponse[0].paginatedResults;
            this.allWords = this.getRandomData(userWords);
        }
        this.createDataForGame();
    }

    createDataForGame = () => {
        const {
            isGameWithUserWords,
            isGameWithLevels,
        } = this.props;
        const {
            page,
        } = this.state;
        if (isGameWithLevels) {
            this.dataForGameRound = (page - 1) % 2 === 0
                ? this.allWords.slice(0, 10)
                : this.allWords.slice(10, 20);
        }
        if (isGameWithUserWords) {
            this.dataForGameRound = this.allWords.slice();
        }

        this.filterData = this.dataForGameRound.map((data) => ({
            word: data.word,
            wordTranslate: data.wordTranslate,
            wordAudio: data.audio,
            wordTranscription: data.transcription,
            wordId: data.id,
            wordImage: data.image,
        }));
        this.setState({
            dataForGame: this.filterData,
            haveWords: true,
        });
    }

    getRandomData = (data) => {
        const newData = data.slice();
        const randomData = [];
        for (let i = 9; i >= 0; i -= 1) {
            const randomIndex = this.randomInteger(0, newData.length - 1);
            randomData.push(newData[randomIndex]);
            newData.splice(randomIndex, 1);
        }
        return randomData;
    }

    randomInteger = (min, max) => {
        const rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }

    selectLevel = (level, page) => {
        const {
            isGameWithUserWords,
            isGameWithLevels,
        } = this.props;
        if (isGameWithLevels) {
            this.setState({
                level,
                page,
                haveWords: false,
                correctWords: [],
                isGameModeTrain: true,
                listening: false,
                isClickedCard: false,
                totalSpokenWords: 0,
            }, this.handleListening);
        }
        if (isGameWithUserWords) {
            this.setState(() => ({
                haveWords: false,
                correctWords: [],
                isGameModeTrain: true,
                listening: false,
                isClickedCard: false,
                totalSpokenWords: 0,
            }), this.handleListening);
        }
        this.putSettings(level, page);
    }

    handleClickCard = (index, audioUrl, imageUrl, translate) => {
        this.setState({
            isClickedCard: true,
            indexClickedCard: index,
            activeAudioUrl: `https://raw.githubusercontent.com/aidfromdeagland/rslang-data/master/${audioUrl}`,
            activeImageUrl: `https://raw.githubusercontent.com/aidfromdeagland/rslang-data/master/${imageUrl}`,
            activeTranslate: translate,
        });
    }

    changeGameMode = () => {
        this.setState((prev) => ({
            isGameModeTrain: !prev.isGameModeTrain,
            listening: !prev.listening,
            correctWords: [],
            isClickedCard: false,
            totalSpokenWords: 0,
        }), this.handleListening);
    }

    handleListening = () => {
        const {
            listening,
        } = this.state;
        this.setState({
            isClickedCard: false,
            indexClickedCard: null,
            activeAudioUrl: null,
            activeImageUrl: null,
            activeTranslate: null,
        });

        if (listening) {
            recognition.start();
            recognition.onend = () => {
                recognition.start();
            };
        } else {
            recognition.stop();
            recognition.onend = () => {
                recognition.stop();
            };
        }

        recognition.onresult = (event) => {
            for (let i = event.resultIndex; i < event.results.length; i += 1) {
                const { transcript } = event.results[i][0];
                this.setState({ speakWord: transcript });
                this.checkWords(transcript);
            }
        };
    }

    checkWords = (word) => {
        const { isGameWithUserWords } = this.props;
        const correctWords = this.state.correctWords.slice();
        let totalSpokenWords = this.state.totalSpokenWords;
        this.dataForGameRound.forEach((wordData) => {
            if (wordData.word.toLowerCase() === word.toLowerCase()) {
                correctWords.push(word.toLowerCase());
                this.setState({
                    correctWords,
                    activeImageUrl: `https://raw.githubusercontent.com/aidfromdeagland/rslang-data/master/${wordData.image}`,
                    isClickedCard: true,
                });
                if (isGameWithUserWords) {
                    const result = getMemoInfoMiniGames(true, wordData.userWord.optional.repeats, wordData.userWord.optional.nextDate);
                    const wordPut = { ...wordData };
                    wordPut.userWord.optional.repeats = result.repetitions;
                    wordPut.userWord.optional.prevDate = result.prevRepetitionDate;
                    wordPut.userWord.optional.nextDate = result.nextRepetitionDate;
                    WordService.putWord(wordPut.id, { optional: wordPut.userWord.optional });
                }

                if (correctWords.length === 10) {
                    this.handleRoundEnd();
                }
            }
        });
        totalSpokenWords += 1;
        this.setState({
            totalSpokenWords,
            activeTranslate: word.toLowerCase(),
        });
    }

    handleRoundEnd = () => {
        const { level, page } = this.state;
        recognition.stop();
        recognition.onend = () => {
            recognition.stop();
        };
        this.setState({
            isRoundEnd: true,
            listening: false,
        });
        this.addStatisticsData(level, page);
    }

    handleByNextRound = () => {
        const {
            level,
            page,
        } = this.state;
        if (level === 6 && page === 60) {
            this.selectLevel(1, 1);
        }
        if (page < 60) {
            this.selectLevel(level, parseFloat(page) + 1);
        } else {
            this.selectLevel(level + 1, 1);
        }
        this.setState({
            isRoundEnd: false,
            correctWords: [],
            totalSpokenWords: 0,
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
            correctWords,
            totalSpokenWords,
            isRoundEnd,
            level,
            page,
            isGameModeTrain,
            speakWord,
        } = this.state;
        const {
            isGameWithLevels,
        } = this.props;
        if (haveWords) {
            return (
                <div>
                    {isRoundEnd && (
                        <ModalResult
                            totalSpokenWords={totalSpokenWords}
                            correctWords={correctWords.length}
                            handleByNextRound={this.handleByNextRound}
                        />
                    )}
                    <div className="speakit-header">
                        {isGameWithLevels && (
                            <Dropdown
                                selectLevel={this.selectLevel}
                                level={level}
                                page={page}
                            />
                        )}
                    </div>
                    <div className="speakit-content">
                        <span className="content__points">{'⭐'.repeat(correctWords.length)}</span>
                        <ul className="speakit-cards-container">
                            <li className="speakit-scene">
                                <img className="speakit-scene__image" alt="word" src={isClickedCard ? activeImageUrl : question} />
                                <p className={isGameModeTrain ? 'speakit-scene__translation' : 'speakit-scene__translation speakit-scene__translation_game'}>{activeTranslate}</p>
                            </li>
                            {dataForGame.map((wordData, index) => (
                                <ItemWord
                                    key={wordData.wordId}
                                    wordData={wordData}
                                    cardIndex={index}
                                    indexClickedCard={indexClickedCard}
                                    isClickedCard={isGameModeTrain ? isClickedCard : null}
                                    handleClickCard={this.handleClickCard}
                                    activeAudioUrl={activeAudioUrl}
                                    activeImageUrl={activeImageUrl}
                                    isGameModeTrain={isGameModeTrain}
                                    speakWord={speakWord}
                                    correctWords={correctWords}
                                />
                            ))}
                        </ul>
                        <Button
                            className="speakit-content__button speakit-content__button_speak"
                            title={isGameModeTrain ? 'speak' : 'on air'}
                            onClick={this.changeGameMode}
                        />
                    </div>
                </div>
            );
        }
        return <Spinner />;
    }
}

import React, { Component } from 'react';
import './vocabulary.scss';

import {
    Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { WordList } from './wordList';
import { WordService } from '../../../services/wordServices';
import { Spinner } from '../../shared/spinner';
import { SettingService } from '../../../services/settingServices';

const maximumWordsQuantity = 3600;

export class Vocabulary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDataReady: false,
            learnedWords: [],
            difficultWords: [],
            deletedWords: [],
        };
    }

    componentDidMount() {
        this.getReadyData();
    }

    getReadyData = async () => {
        await Promise.all([this.getWords(), this.getSettings()]);
        this.setState({ isDataReady: true });
    }

    getWords = async () => {
        const totalUserWordsAggregatedQuery = { userWord: { $exists: true } };

        const totalWordsResponse = await WordService.getUserAggWords(
            '', totalUserWordsAggregatedQuery, maximumWordsQuantity,
        );
        const totalWords = totalWordsResponse[0].paginatedResults;
        this.setState({
            learnedWords: totalWords
                .filter((wordObject) => (
                    wordObject.userWord.optional.isDifficult === false
                    && wordObject.userWord.optional.isDeleted === false)),
            difficultWords: totalWords
                .filter((wordObject) => wordObject.userWord.optional.isDifficult === true
                    && wordObject.userWord.optional.isDeleted === false),
            deletedWords: totalWords
                .filter((wordObject) => wordObject.userWord.optional.isDeleted === true),
        });
    };

    getSettings = async () => {
        const settings = await SettingService.get();
        this.settings = settings.optional;
    }

    handleRestoreWord = (wordObject) => {
        const { id, userWord: { optional } } = wordObject;
        const objectToPut = { optional };
        if (optional.isDeleted) {
            optional.isDeleted = false;
            WordService.putWord(id, objectToPut);
            if (optional.isDifficult) {
                this.setState((prev) => ({
                    deletedWords: prev.deletedWords.filter((object) => object.id !== id),
                    difficultWords: prev.difficultWords.concat(wordObject),
                }));
            } else {
                this.setState((prev) => ({
                    deletedWords: prev.deletedWords.filter((object) => object.id !== id),
                    learnedWords: prev.learnedWords.concat(wordObject),
                }));
            }
        } else if (optional.isDifficult) {
            optional.isDifficult = false;
            WordService.putWord(id, objectToPut);
            this.setState((prev) => ({
                difficultWords: prev.difficultWords.filter((object) => object.id !== id),
                learnedWords: prev.learnedWords.concat(wordObject),
            }));
        }
    }

    render() {
        const { isDataReady } = this.state;
        return isDataReady
            ? (
                <div className="content-container">
                    <Tabs className="vocabulary" selectedTabClassName="vocabulary__tab_active" defaultFocus>
                        <TabList className="vocabulary__tab-list">
                            <Tab className="vocabulary__tab">Learned</Tab>
                            <Tab className="vocabulary__tab">Difficult</Tab>
                            <Tab className="vocabulary__tab">Deleted</Tab>
                        </TabList>

                        <TabPanel className="vocabulary__panel">
                            <WordList
                                words={this.state.learnedWords}
                                settings={this.settings}
                            />
                        </TabPanel>
                        <TabPanel className="vocabulary__panel">
                            <WordList
                                words={this.state.difficultWords}
                                settings={this.settings}
                                isSpecial
                                handleRestoreWord={this.handleRestoreWord}
                            />
                        </TabPanel>
                        <TabPanel className="vocabulary__panel">
                            <WordList
                                words={this.state.deletedWords}
                                settings={this.settings}
                                isSpecial
                                handleRestoreWord={this.handleRestoreWord}
                            />
                        </TabPanel>
                    </Tabs>
                </div>
            )
            : <Spinner optionalClassName="spinner_centered" />;
    }
}

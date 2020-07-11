import React, { Component } from 'react';
import './vocabulary.scss';

import {
    Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import PropTypes from 'prop-types';
import { wordsMockLearned, wordsMockDifficult, wordsMockDeleted } from './tempMock';
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
        this.learnedWords = [];
        this.difficultWords = [];
        this.deletedWords = [];

        const totalWordsResponse = await WordService.getUserAggWords(
            '', totalUserWordsAggregatedQuery, maximumWordsQuantity,
        );
        const totalWords = totalWordsResponse[0].paginatedResults;
        this.learnedWords = totalWords.filter((wordObject) => wordObject.userWord.optional.isDeleted === false && wordObject.userWord.optional.isDifficult === false);
        this.difficultWords = totalWords.filter((wordObject) => wordObject.userWord.optional.isDifficult === true);
        this.deletedWords = totalWords.filter((wordObject) => wordObject.userWord.optional.isDeleted === true);
        console.log('WORDS: ', this.learnedWords, this.difficultWords, this.deletedWords);
    };

    getSettings = async () => {
        const settings = await SettingService.get();
        this.settings = settings.optional;
        console.log('SETTINGS: ', this.settings);
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
                            <WordList words={this.learnedWords} settings={this.settings} />
                        </TabPanel>
                        <TabPanel className="vocabulary__panel">
                            <WordList words={this.difficultWords} settings={this.settings} isSpecial />
                        </TabPanel>
                        <TabPanel className="vocabulary__panel">
                            <WordList words={this.deletedWords} settings={this.settings} isSpecial />
                        </TabPanel>
                    </Tabs>
                </div>
            )
            : <Spinner />;
    }
}

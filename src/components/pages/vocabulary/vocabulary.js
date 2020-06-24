import React, { Component } from 'react';
import './vocabulary.scss';

import {
    Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { wordsMockLearned, wordsMockDifficult, wordsMockDeleted } from './tempMock';
import { settingsForExample } from '../study/dataForExample';
import { randomizeSettingsValues } from '../../../services/temporaryServices';
import { WordList } from './wordList';

export class Vocabulary extends Component {
    constructor(props) {
        super(props);
        this.learnedWords = wordsMockLearned;
        this.difficultWords = wordsMockDifficult;
        this.deletedWords = wordsMockDeleted;
        this.settings = randomizeSettingsValues(settingsForExample);
    }

    render() {
        return (
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
                        <WordList words={this.difficultWords} settings={this.settings} />
                    </TabPanel>
                    <TabPanel className="vocabulary__panel">
                        <WordList words={this.deletedWords} settings={this.settings} />
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

Vocabulary.defaultProps = {
    learnedWords: [],
    difficultWords: [],
    removedWords: [],
    settings: {
        mainSettings: {
            word: true,
            sentence: false,
            textMeaning: false,
        },
        additionalSettings: {
            transcription: true,
            image: true,
        },
    },
};

import React, { Component } from 'react';
import './vocabulary.scss';

import {
    Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { wordsMockLearned, wordsMockDifficult, wordsMockDeleted } from './tempMock';
import { WordList } from './wordList';

export class Vocabulary extends Component {
    constructor(props) {
        super(props);
        this.learnedWords = wordsMockLearned;
        this.difficultWords = wordsMockDifficult;
        this.deletedWords = wordsMockDeleted;
    }

    render() {
        return (
            <div className="content-container">
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <audio className="vocabulary__speaker" src="" />
                <Tabs className="vocabulary" selectedTabClassName="vocabulary__tab_active" defaultFocus>
                    <TabList className="vocabulary__tab-list">
                        <Tab className="vocabulary__tab">Learned</Tab>
                        <Tab className="vocabulary__tab">Difficult</Tab>
                        <Tab className="vocabulary__tab">Deleted</Tab>
                    </TabList>

                    <TabPanel className="vocabulary__panel">
                        <WordList words={this.learnedWords} />
                    </TabPanel>
                    <TabPanel className="vocabulary__panel">
                        <WordList words={this.difficultWords} />
                    </TabPanel>
                    <TabPanel className="vocabulary__panel">
                        <WordList words={this.deletedWords} />
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
};

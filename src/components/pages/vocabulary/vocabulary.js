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

const maximumWordsQuantity = 3600;

export class Vocabulary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isWordsLoaded: false,
        };
    }

    getWords = async () => {
        const totalUserWordsAggregatedQuery = { userWord: { $exists: true } };
        this.learnedWords = [];
        this.difficultWords = [];
        this.deletedWords = [];

        const totalWords = await WordService.getUserAggWords(
            '', totalUserWordsAggregatedQuery, maximumWordsQuantity,
        );
        console.log(totalWords);
    };

    render() {
        const { settings } = this.props;
        const { isWordsLoaded } = this.state;
        return isWordsLoaded
            ? (
                <div className="content-container">
                    <Tabs className="vocabulary" selectedTabClassName="vocabulary__tab_active" defaultFocus>
                        <TabList className="vocabulary__tab-list">
                            <Tab className="vocabulary__tab">Learned</Tab>
                            <Tab className="vocabulary__tab">Difficult</Tab>
                            <Tab className="vocabulary__tab">Deleted</Tab>
                        </TabList>

                        <TabPanel className="vocabulary__panel">
                            <WordList words={wordsMockLearned} settings={settings} />
                        </TabPanel>
                        <TabPanel className="vocabulary__panel">
                            <WordList words={wordsMockDifficult} settings={settings} isSpecial />
                        </TabPanel>
                        <TabPanel className="vocabulary__panel">
                            <WordList words={wordsMockDeleted} settings={settings} isSpecial />
                        </TabPanel>
                    </Tabs>
                </div>
            )
            : <Spinner />;
    }
}

Vocabulary.defaultProps = {
    settings: {
        mainSettings: {
            word: true,
            sentence: true,
            textMeaning: true,
        },
        additionalSettings: {
            transcription: true,
            image: true,
        },
    },
};

Vocabulary.propTypes = {
    settings: PropTypes.objectOf(PropTypes.shape({
        mainSettings: PropTypes.object,
        additionalSettings: PropTypes.object,
    })),
};

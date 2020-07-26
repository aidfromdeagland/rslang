import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './wordList.scss';
import { VocabularyWord } from './word';

const wordByDateComparator = (leftWordObj, rightWordObj) => (
    rightWordObj.userWord.optional.prevDate - leftWordObj.userWord.optional.prevDate
);

export class WordList extends Component {
    render() {
        const {
            settings, isSpecial, handleRestoreWord, words,
        } = this.props;
        return words
            ? (
                <ul className="vocabulary__words">
                    { words
                        .sort(wordByDateComparator)
                        .map(
                            (word) => (
                                <VocabularyWord
                                    word={word}
                                    key={word.id}
                                    settings={settings}
                                    isSpecial={isSpecial}
                                    handleRestoreWord={handleRestoreWord}
                                />
                            ),
                        ) }
                </ul>
            )
            : null;
    }
}

WordList.defaultProps = {
    isSpecial: false,
};

WordList.propTypes = {
    settings: PropTypes.object.isRequired,
    words: PropTypes.arrayOf(PropTypes.object).isRequired,
    isSpecial: PropTypes.bool,
};

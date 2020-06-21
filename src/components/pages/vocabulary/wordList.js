import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './wordList.scss';
import { VocabularyWord } from './word';

export class WordList extends Component {
    constructor(props) {
        super(props);
        this.words = props.words;
    }

    render() {
        return (
            <ul className="vocabulary__words">
                { this.words.map((word) => <VocabularyWord word={word} key={word.id} />) }
            </ul>
        );
    }
}

WordList.defaultProps = {
    words: [],
};

WordList.propTypes = {
    words: PropTypes.arrayOf(PropTypes.object),
};

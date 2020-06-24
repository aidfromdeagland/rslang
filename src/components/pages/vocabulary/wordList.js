import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './wordList.scss';
import { VocabularyWord } from './word';

export class WordList extends Component {
    constructor(props) {
        super(props);
        this.words = props.words;
        this.settings = props.settings;
    }

    render() {
        return (
            <ul className="vocabulary__words">
                { this.words.map(
                    (word) => <VocabularyWord word={word} key={word.id} settings={this.settings} />,
                    ) }
            </ul>
        );
    }
}

WordList.defaultProps = {
    words: [],
    settings: [],
};

WordList.propTypes = {
    words: PropTypes.arrayOf(PropTypes.object),
    settings: PropTypes.object,
};

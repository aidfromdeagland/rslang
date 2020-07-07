/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Word } from './word';

export class WordList extends Component {
    render() {
        const {
            words, wordId, selected, selectCorrect, pressNumber,
        } = this.props;

        const wordsRender = words.map((w, i) => (
            <Word
                key={w.id + wordId}
                id={w.id}
                text={w.wordTranslate}
                isCorrect={w.id === wordId}
                selected={selected}
                selectCorrect={selectCorrect}
                number={i + 1}
                pressNumber={pressNumber}
            />
        ));
        return (<div className="audio-call__words">{wordsRender}</div>);
    }
}

WordList.defaultProps = {
    selectCorrect: false,
    pressNumber: undefined,
};

WordList.propTypes = {
    words: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        wordTranslate: PropTypes.string.isRequired,
    })).isRequired,
    wordId: PropTypes.string.isRequired,
    selected: PropTypes.func.isRequired,
    selectCorrect: PropTypes.bool,
    pressNumber: PropTypes.number,
};

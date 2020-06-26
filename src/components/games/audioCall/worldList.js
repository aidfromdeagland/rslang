/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { World } from './world';

export class WorldList extends Component {
    render() {
        const {
            words, wordId, selected, selectCorrect,
        } = this.props;

        const wordsRender = words.map((w) => (
            <World
                key={w.id + wordId}
                id={w.id}
                text={w.wordTranslate}
                isCorrect={w.id === wordId}
                selected={selected}
                selectCorrect={selectCorrect}
            />
        ));
        return (<div className="audio-call__words">{wordsRender}</div>);
    }
}

WorldList.defaultProps = {
    selectCorrect: false,
};

WorldList.propTypes = {
    words: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        wordTranslate: PropTypes.string.isRequired,
    })).isRequired,
    wordId: PropTypes.string.isRequired,
    selected: PropTypes.func.isRequired,
    selectCorrect: PropTypes.bool,
};

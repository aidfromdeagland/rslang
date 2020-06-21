/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './vocabulary.scss';
import { WordList } from './wordList';
import { wordsMockLearned, wordsMockDifficult, wordsMockDeleted } from './tempMock';
import { NavLink } from 'react-router-dom';

export class Vocabulary extends Component {
    constructor(props) {
        super(props);
        this.learnedWords = props.learnedWords;
        this.difficultWords = props.difficultWords;
        this.removedWords = props.removedWords;
    }

    render() {
        return (
            <div className="vocabulary">
                <ul className="vocabulary__tabs">
                    <li className="vocabulary__tab">
                        <NavLink to="vocabulary/learned">Learned words</NavLink>
                    </li>
                    <li className="vocabulary__tab">
                        <NavLink to="vocabulary/difficult">Difficult words</NavLink>
                    </li>
                    <li className="vocabulary__tab">
                        <NavLink to="vocabulary/deleted">Difficult words</NavLink>
                    </li>
                </ul>
                <WordList words={wordsMockLearned} />
            </div>
        );
    }
}

Vocabulary.defaultProps = {
    learnedWords: [],
    difficultWords: [],
    removedWords: [],
};

Vocabulary.propTypes = {
    learnedWords: PropTypes.arrayOf(PropTypes.object),
    difficultWords: PropTypes.arrayOf(PropTypes.object),
    removedWords: PropTypes.arrayOf(PropTypes.object),
};

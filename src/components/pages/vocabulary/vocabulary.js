/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './vocabulary.scss';
import { WordList } from './wordList';
import { wordsTempMock } from './tempMock';

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
                        <label htmlFor="tab-learned" className="vocabulary__label">
                            Learned words
                        </label>
                        <input type="radio" name="tab-radio" defaultChecked id="tab-learned" />
                        <WordList words={wordsTempMock} />
                    </li>
                    <li className="vocabulary__tab">
                        <label htmlFor="tab-difficult" className="vocabulary__label">
                            Difficult words
                        </label>
                        <input type="radio" name="tab-radio" id="tab-difficult" />
                        <WordList words={wordsTempMock} />
                    </li>
                    <li className="vocabulary__tab">
                        <label htmlFor="tab-removed" className="vocabulary__label">
                            Removed words
                        </label>
                        <input type="radio" name="tab-radio" id="tab-removed" />
                        <WordList words={wordsTempMock} />
                    </li>
                </ul>
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

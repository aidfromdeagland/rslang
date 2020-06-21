/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './vocabulary.scss';

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
                        <ul className="vocabulary__words" words={this.learnedWords}>
                            <li className="vocabulary__word">MISSUR</li>
                        </ul>
                    </li>
                    <li className="vocabulary__tab">
                        <label htmlFor="tab-difficult" className="vocabulary__label">
                            Difficult words
                        </label>
                        <input type="radio" name="tab-radio" id="tab-difficult" />
                        <ul className="vocabulary__words" words={this.difficultWords}>
                            <li className="vocabulary__word">FISSOR</li>
                        </ul>
                    </li>
                    <li className="vocabulary__tab">
                        <label htmlFor="tab-removed" className="vocabulary__label">
                            Removed words
                        </label>
                        <input type="radio" name="tab-radio" id="tab-removed" />
                        <ul className="vocabulary__words" words={this.removedWords}>
                            <li className="vocabulary__word">TOPOR</li>
                        </ul>
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

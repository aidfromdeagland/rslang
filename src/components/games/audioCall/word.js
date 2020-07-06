/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Word extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidUpdate() {
        if (this.props.number === this.props.pressNumber) {
            this.handleSelectWord();
        }
    }

    getClassName() {
        switch (this.state.isCorrect) {
        case undefined:
            if (!this.props.selectCorrect) {
                return 'audio-call__word';
            }
            if (this.props.isCorrect) {
                return 'audio-call__word audio-call__word_correct';
            }
            return 'audio-call__word audio-call__word_excess';

        case true:
            return 'audio-call__word audio-call__word_correct';
        case false:
            return 'audio-call__word audio-call__word_error';
        default: {
            return 'audio-call__word';
        }
        }
    }

    handleSelectWord() {
        if (this.props.selectCorrect) {
            return;
        }
        const {
            isCorrect, selected,
        } = this.props;
        this.setState({ isCorrect });
        selected(isCorrect);
    }

    render() {
        return (
            <div
                className={this.getClassName()}
                onMouseDown={() => this.handleSelectWord()}
                tabIndex="0"
                role="button"
            >
                <span className="word__number">{this.props.number}</span>
                <span className="word__text">{this.props.text}</span>
            </div>
        );
    }
}

Word.defaultProps = {
    selectCorrect: false,
    pressNumber: undefined,
};

Word.propTypes = {
    text: PropTypes.string.isRequired,
    isCorrect: PropTypes.bool.isRequired,
    selected: PropTypes.func.isRequired,
    selectCorrect: PropTypes.bool,
    number: PropTypes.number.isRequired,
    pressNumber: PropTypes.number,
};

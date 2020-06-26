/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class World extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getClassName() {
        switch (this.state.isCorrect) {
        case undefined:
            return this.props.selectCorrect && this.props.isCorrect
                ? 'audio-call__word audio-call__word_correct'
                : 'audio-call__word';
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
            <span
                className={this.getClassName()}
                onMouseDown={() => this.handleSelectWord()}
                tabIndex="0"
                role="button"
            >
                {this.props.text}
            </span>
        );
    }
}

World.defaultProps = {
    selectCorrect: false,
};

World.propTypes = {
    text: PropTypes.string.isRequired,
    isCorrect: PropTypes.bool.isRequired,
    selected: PropTypes.func.isRequired,
    selectCorrect: PropTypes.bool,
};

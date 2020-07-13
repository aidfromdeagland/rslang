import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from '../../shared/button';
import { SavannahStart } from './savannah-start';

export class SavannahStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRepeat: false,
        };
    }

    componentDidMount() {
        this.props.saveDataToStatistics();
    }

    repeatGame = () => {
        this.setState({
            isRepeat: true,
        });
    }

    render() {
        const { wrongAnswers, rightAnswers, getAudio } = this.props;
        const successPercent = Math.round((rightAnswers.length * 100) / (rightAnswers.length + wrongAnswers.length));
        if (this.state.isRepeat) {
            return <SavannahStart />;
        }
        return (
            <div
                className="savannah__statistics"
            >
                <div className="savannah__statistics-btnClose">
                    <NavLink className="savannah__statistics-link" to="/mini-games">
                        &#10006;
                    </NavLink>
                </div>
                <h1>
                    Right answers:

                    {successPercent}
                    %
                </h1>
                <h2 className="savannah__statistics-wrong">Wrong Answers:</h2>

                { wrongAnswers.map((row, index) => (
                    <div
                        className="savannah__statistics-row"
                        key={index}
                    >
                        <div className="savannah__statistics-row_word">
                            {row.word}
                        </div>
                        <div className="savannah__statistics-row_transcription">
                            {row.transcription }
                        </div>
                        <div className="savannah__statistics-row_translate">
                            {row.translate}
                        </div>
                        <div
                            className="savannah__statistics-row_sound"
                            onMouseDown={() => getAudio(row.audio)}
                            tabIndex="0"
                            role="button"
                            label="audio"
                        />

                    </div>

                )) }

                <h2 className="savannah__statistics-right">Right Answers:</h2>
                { rightAnswers.map((row, index) => (
                    <div
                        className="savannah__statistics-row"
                        key={index}
                    >
                        <div className="savannah__statistics-row_word">
                            {row.word}
                        </div>
                        <div className="savannah__statistics-row_transcription">
                            {row.transcription }
                        </div>
                        <div className="savannah__statistics-row_translate">
                            {row.translate}
                        </div>
                        <div
                            className="savannah__statistics-row_sound"
                            aria-hidden
                            onMouseDown={() => getAudio(row.audio)}
                            tabIndex="0"
                            role="button"
                            label="audio"
                        />

                    </div>

                )) }

                <Button
                    onClick={this.repeatGame}
                    className="savannah__statistics-btn"
                    title="Try again!"
                />

            </div>

        );
    }
}

SavannahStatistics.propTypes = {
    wrongAnswers: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    rightAnswers: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
    getAudio: PropTypes.func.isRequired,
};

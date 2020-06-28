import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '../../shared/button';

export class SavannahStatistics extends Component {
    render() {
        const { wrongAnswers, rightAnswers } = this.props;
        return (
            <div
                className="savannah__statistics"
            >
                <h2 className="savannah__statistics-wrong">Wrong Answer:</h2>

                { wrongAnswers.map((row, index) => (
                    <div
                        className="savannah__statistics-row"
                        aria-hidden
                        key={index}
                    >
                        <span>
                            {row.word}
                        </span>
                        <span>
                            {row.translate}
                        </span>

                    </div>

                )) }

                <h2 className="savannah__statistics-right">Right Answer:</h2>
                { rightAnswers.map((row, index) => (
                    <div
                        className="savannah__statistics-row"
                        aria-hidden
                        key={index}
                    >
                        <span>
                            {row.word}
                        </span>
                        <span>
                            {row.translate}
                        </span>

                    </div>

                )) }
                <NavLink className="savannah__statistics-link" to="/mini-games/savannah">
                    <Button className="savannah__statistics-btn" title="Try again!" />
                </NavLink>

            </div>

        );
    }
}

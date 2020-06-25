import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class SavannahCards extends Component {
    render() {
        const { translateWords, id } = this.props;
        const cards = translateWords.sort(() => 0.5 - Math.random());

        return (
            <div className="container__cards">

                { cards.map((word, index) => (
                    <div
                        className="card"
                        key={index}
                        onClick={() => {
                            if (word.id === id) {
                                console.log('yep');
                            } else {
                                console.log('nope');
                            }
                        }}
                    >
                        {word.translate}
                    </div>
                )) }

            </div>

        );
    }
}

SavannahCards.propTypes = {
    translateWords: PropTypes.array.isRequired,
};

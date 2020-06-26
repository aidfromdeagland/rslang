import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class SavannahCards extends Component {
    render() {
        const { translateWords, id } = this.props;
        const cards = translateWords.sort(() => 0.5 - Math.random());

        return (
            <div className="savannah__cards">

                { cards.map((word, index) => (
                    <div
                        className="savannah__cards-card"
                        aria-hidden
                        key={index}
                        onClick={() => {
                            if (word.id === id) {
                                console.log('yep');
                                this.props.getNextWord();
                                this.props.resizeImage();
                            } else {
                                console.log('nope');
                                this.props.lostLive();
                                this.props.getNextWord();
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
    id: PropTypes.string.isRequired,
    lostLive: PropTypes.func.isRequired,
};

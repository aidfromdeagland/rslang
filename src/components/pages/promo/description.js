import React, { Component } from 'react';
import './description.scss';

export class Description extends Component {
    render() {
        return (
            <section className="promo__description app-description">
                <div className="content-container">
                    <h2 className="app-description__heading">More words you know, more scores to speech flow</h2>
                    <p className="app-description__text">
                        Fluent English provides you with a great number of opportunities.
                        And your lexicon is the basis of your English,
                        the basis for these opportunities.
                        <br />
                        <span className="brand">iKnow</span>
                        &nbsp; is a service for learning English words, that helps
                        to learn new words with the help of the principle of interval repetition.
                    </p>

                    <p className="app-description__text" style={{ color: 'red' }}>
                        Block for interval repetition rules description
                        (implement after interval repetition logic realisation):
                        на промо-странице приложения присутствует описание набора правил
                        для определения интервала,
                        через который будет вновь показана карточка с изучаемым словом.
                        Правила интервального повторения выглядят разумными и логичными,
                        в ходе проверки не выявлено расхождения работы приложения
                        с указанными правилами +10
                    </p>
                </div>
            </section>
        );
    }
}

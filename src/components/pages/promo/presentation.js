import React, { Component } from 'react';
import './presentation.scss';

export class Presentation extends Component {
    render() {
        return (
            <section className="promo__presentation presentation">
                <div className="content-container">
                    <h2 className="presentation__heading">Still doubt?</h2>
                    <p className="presentation__text">
                        Just watch the presentation below and click the Authentication button!
                    </p>
                    <iframe
                        title="presentation"
                        className="presentation__video"
                        src="https://www.youtube.com/embed/VSW7cSMdKiA"
                    />
                </div>
            </section>
        );
    }
}

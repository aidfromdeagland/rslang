import React, { Component } from 'react';
import './promo.scss';
import { Slogans } from './slogans';
import { Advantages } from './advantages';

export class Promo extends Component {
    render() {
        return (
            <div className="promo">
                <Slogans />
                <Advantages />
                <section className="promo__instructions">
                    <h2>Instructions</h2>
                </section>
                <section className="promo__presentation">
                    <h2>Presentation</h2>
                </section>
            </div>
        );
    }
}

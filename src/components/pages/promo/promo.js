import React, { Component } from 'react';
import './promo.scss';

export class Promo extends Component {
    render() {
        return (
            <div className="promo">
                <h1 className="promo__heading">iKnow</h1>
                <section className="promo__about">
                    <h2>О чем речь?</h2>
                </section>
                <section className="promo__advantages">
                    <h2>Преимущества</h2>
                </section>
                <section className="promo__feedback">
                    <h2>Пользователи о нас</h2>
                </section>
            </div>
        );
    }
}

import React, { Component } from 'react';
import homerImg from '../../../assets/images/promo__homer.png';
import patrickImg from '../../../assets/images/promo__patrick.png';
import mutkoImg from '../../../assets/images/promo__mutko.png';
import progressImg from '../../../assets/images/promo__progress.png';
import './slogans.scss';
import { Slogan } from './slogan';

export class Slogans extends Component {
    render() {
        return (
            <section className="promo__slogans slogans">
                <div className="content-container">
                    <h1 className="slogans__heading">
                        <span className="brand">iKnow</span>
                    </h1>
                    <ul className="promo__slogans-list slogans-list">
                        <Slogan text="more than Patrick" image={patrickImg} />
                        <Slogan text="more than Homer" image={homerImg} />
                        <Slogan text="more than Mr. Mutko" image={mutkoImg} />
                        <Slogan text="more than yesterday!" image={progressImg} />
                    </ul>
                </div>
            </section>
        );
    }
}

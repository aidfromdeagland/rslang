import React, { Component } from 'react';
import personalizedImg from '../../../assets/images/promo__personalized.png';
import configurableImg from '../../../assets/images/promo__configurable.png';
import mobileFriendlyImg from '../../../assets/images/promo__mobile-friendly.png';
import freeImg from '../../../assets/images/promo__free.png';
import { Advantage } from './advantage';
import './advantages.scss';

export class Advantages extends Component {
    render() {
        return (
            <section className="promo__advantages">
                <div className="content-container">
                    <h2 className="promo__advantages-heading">For your comfort</h2>
                    <ul className="promo__advantages-list">
                        <Advantage header="personalized" text="There is no universal way to learn words. We offer an individual approach." image={personalizedImg} />
                        <Advantage header="configurable" text="Configure this application according to your needs, and make your study process pleasant." image={configurableImg} />
                        <Advantage header="mobile friendly" text="Learn everywhere. All you need are the internet and a browser." image={mobileFriendlyImg} />
                        <Advantage header="free" text="We don't need your money. Spend it on yourself." image={freeImg} />
                    </ul>
                </div>
            </section>
        );
    }
}

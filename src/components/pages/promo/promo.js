import React, { Component } from 'react';
import './promo.scss';
import { Slogans } from './slogans';
import { Advantages } from './advantages';
import { Description } from './description';
import { Presentation } from './presentation';

export class Promo extends Component {
    render() {
        return (
            <div className="promo">
                <Slogans />
                <Advantages />
                <Description />
                <Presentation />
            </div>
        );
    }
}

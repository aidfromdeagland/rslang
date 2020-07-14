import React, { Component } from 'react';
import './infoMessage.scss';
import { Button } from '../../shared/button';

export class InfoMessage extends Component {
    render() {
        const { message, okClickHandler } = this.props;
        return (
            <div className="study-info">
                <p className="study-info__message">{message}</p>
                <Button className="study-info__button" title="OK" onClick={okClickHandler} />
            </div>
        );
    }
}

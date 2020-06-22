import React, { Component } from 'react';

export class SavannahImage extends Component {
    render() {
        return (
            <div
                className="container__image"
                onClick={this.props.startGame}
            />
        );
    }
}

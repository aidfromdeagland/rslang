import React, { Component } from 'react';

export class SavannahWord extends Component {
    render() {
        const { word } = this.props;
        return (
            <div>
                {word}
            </div>
        );
    }
}

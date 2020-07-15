import React, { Component } from 'react';
import './spinner.scss';

export class Spinner extends Component {
    render() {
        const { optionalClassName } = this.props;
        return (
            <div className={optionalClassName ? `spinner ${optionalClassName}` : 'spinner'} />
        );
    }
}

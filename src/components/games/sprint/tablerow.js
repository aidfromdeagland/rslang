import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class TableRow extends Component {
    render() {
        const { index, date, score } = this.props;
        const d = new Date(date);
        const day = d.getDate().toString().padStart(2, '0');
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const year = d.getFullYear().toString().substr(2);
        const hours = (d.getHours()).toString().padStart(2, '0');
        const minutes = (d.getMinutes()).toString().padStart(2, '0');
        const datestring = `${day}.${month}.${year}  ${hours}:${minutes}`;
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{datestring}</td>
                <td>{score}</td>
            </tr>
        );
    }
}

TableRow.propTypes = {
    index: PropTypes.number,
    date: PropTypes.number,
    score: PropTypes.number,
};

TableRow.defaultProps = {
    index: 0,
    date: 0,
    score: 0,
};

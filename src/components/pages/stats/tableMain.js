import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Row = ({ maxNew, maxRight, total }) => (
    <div className="row">
        <div>{maxNew}</div>
        <div>{maxRight}</div>
        <div>{total}</div>
    </div>
);
export class TableMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    maxNew: null, maxRight: null, total: null,
                },

            ],
        };
    }

    render() {
        const { data } = this.state;
        const rows = data.map((rowData, index) => (
            <Row
                key={index}
                {...rowData}
            />
        ));

        return (
            <div className="table">
                <h1>Main statistics</h1>
                <div className="header">
                    <div>Max new words a day</div>
                    <div>Max right answers a day</div>
                    <div>Total words you learned!</div>

                </div>
                <div className="body">
                    {rows}
                </div>
            </div>
        );
    }
}

TableMain.propTypes = {
    maxNew: PropTypes.number.isRequired,
    maxRight: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
};

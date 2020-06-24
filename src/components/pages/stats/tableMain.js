import React, { Component } from 'react';

const Row = ({
    maxNew, maxRight, total,
}) => (
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
                    maxNew: '', maxRight: '', total: '',
                },

            ],
        };
    }

    render() {
        const { data } = this.state;
        const rows = data.map((rowData) => <Row {...rowData} />);

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

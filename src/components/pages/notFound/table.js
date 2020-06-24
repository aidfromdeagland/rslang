import React, { Component } from 'react';
import { TableGames } from '../stats/tableGames';
import { TableMain } from '../stats/tableMain';

export class Table extends Component {
    render() {
        return (
            <div className="tables">
                <TableMain />
                <TableGames />
            </div>
        );
    }
}

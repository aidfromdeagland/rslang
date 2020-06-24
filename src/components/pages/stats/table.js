import React, { Component } from 'react';
import { TableGames } from './tableGames';
import { TableMain } from './tableMain';

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

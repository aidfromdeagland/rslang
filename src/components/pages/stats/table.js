import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { TableGames } from './tableGames';
import { TableMain } from './tableMain';
import { Button } from '../../shared/button';

export class Table extends Component {
    render() {
        return (
            <div className="tables">
                <NavLink className="tables__link" to="/stats">
                    <Button className="tables__btn" title="Back to graph" />
                </NavLink>
                <h1>Main statistics</h1>
                <TableMain />
                <h1>Statistics of mini-games</h1>
                <TableGames />
            </div>
        );
    }
}

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { TableGames } from './tableGames';
import { TableMain } from './tableMain';
import { Button } from '../../shared/button';

export class Table extends Component {
    render() {
        return (
            <div className="tables">
                <NavLink to="/stats">
                    <Button className="tables__btn" title="Back to graph" />
                </NavLink>
                <TableMain />
                <TableGames />
            </div>
        );
    }
}

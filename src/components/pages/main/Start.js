import React, { Component } from 'react';
import './main.scss';
import './start.scss';
import { NavLink } from 'react-router-dom';
import { Button } from '../../shared/button';

export class Start extends Component {
    render() {
        return (
            <div className="start-learn">
                <NavLink to={`/main/study`} className='learning-words'>
                    <Button className="button btn-start" title="START" />
                </NavLink>
            </div>
        );
    }
}

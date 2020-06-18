import React, { Component } from 'react';
import './miniGames.scss';
import { NavLink } from 'react-router-dom';

export class Game extends Component {
    render() {
        return (
            <NavLink to={`/mini-games${this.props.data.link}`} className='game-card'>
                <img src={this.props.data.imageSrc} alt={this.props.data.link.slice(1)} />
                <h2>{this.props.data.title}</h2>
            </NavLink>
        )
    }
}

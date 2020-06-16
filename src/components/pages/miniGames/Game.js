import React, { Component } from 'react';
// import dataGames from './dataGames';
import './miniGames.scss';
import { NavLink } from 'react-router-dom';

export class Game extends Component {
    render() {
        console.log(this.props)
        return (
            <NavLink to={`/mini-games${this.props.data.link}`} className='game-card'>
                <img src={this.props.data.imageSrc}/>
                <div>{this.props.data.title}</div>
            </NavLink>
        )
    }
}

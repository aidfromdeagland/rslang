import React, { Component } from 'react';

export class Person extends Component {
    render() {
        return (
            <div className='team-person'>
                <div className ="person-photo-container">
                    <img className='person-photo' src={ `${this.props.data.photo}` } alt={this.props.data.name} />
                </div>
                <div className='person-name'> { this.props.data.name } </div>
                <div className='person-description'>{ this.props.data.description }</div>
                <div className='github-link'><div className='github-icon'></div><a href={this.props.data.github}>Github</a></div>
            </div>
        );
    }
}

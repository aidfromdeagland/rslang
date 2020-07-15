import React, { Component } from 'react';

export class Person extends Component {
    render() {
        return (
            <div className="team-person">
                <div className="person-photo-container">
                    <img className="person-photo" src={`${this.props.data.photo}`} alt={this.props.data.name} />
                </div>
                <div className="person-name">
                    {' '}
                    {this.props.data.name}
                    {' '}
                </div>
                <ul className="person-responsibilities">{this.props.data.description
                    .split(',')
                    .map((responsibility, index) => <li className="person-task" key={index}>{responsibility}</li>)}
                </ul>
                <a href={this.props.data.github} className="github-link">
                    <div className="github-icon" />
                    {this.props.data.github.substring(this.props.data.github.lastIndexOf('/') + 1)}
                </a>
            </div>
        );
    }
}

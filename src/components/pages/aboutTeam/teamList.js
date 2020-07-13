import React, { Component } from 'react';
import { Person } from './person';

export class TeamList extends Component {
    render() {
        return (
            <div className="team-container">
                {this.props.team.map((person, index) => (
                    <Person
                        data={person}
                        key={index}
                    />
                ))}
            </div>
        );
    }
}

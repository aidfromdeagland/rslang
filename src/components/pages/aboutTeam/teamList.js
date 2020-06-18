import React, { Component } from 'react';
import { Person } from './Person';

export class TeamList extends Component {
    render() {
        console.log(this.props.team)
      return (
        <div className="team-container">
            {this.props.team.map((person, index) =>
                <Person
                data = {person}
                key = { index }
                />
            )}
        </div>
      );
    }
  }

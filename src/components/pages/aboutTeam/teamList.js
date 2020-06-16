import React, { Component } from 'react';
import { Person } from './Person';
import dataAboutTeam from './dataAboutTeam';

export class TeamList extends Component {

    // renderPersons() {
    //     return dataAboutTeam.map((peron) => {
    //         <div className="team-container">
    //             <Person {...peron} />
    //         </div>
    //     })
    // }

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

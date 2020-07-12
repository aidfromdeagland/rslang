import React, { Component } from 'react';
import './aboutTeam.scss';
import dataAboutTeam from './dataAboutTeam';
import { TeamList } from './teamList';

export class AboutTeam extends Component {
    render() {
        return (
            <div className="about-team">
                <h1>About team</h1>
                <div>
                    <TeamList team={dataAboutTeam
                        .slice()
                        .sort((a, b) => (a.name > b.name ? 1 : -1))}
                    />
                </div>
            </div>
        );
    }
}

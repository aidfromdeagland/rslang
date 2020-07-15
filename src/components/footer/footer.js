import React, { Component } from 'react';
import './footer.scss';

export class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <a href="https://github.com/aidfromdeagland/rslang" className="github-link">
                    <div className="github-icon" />
                    github
                </a>
                <p>&copy;iKnow 2020</p>
            </footer>
        );
    }
}

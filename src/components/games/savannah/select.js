import React, { Component } from 'react';

export class Select extends Component {
    constructor(props) {
        super(props);
        this.state = { group: 0 };
    }

    handleChange = (e) => {
        this.setState(
            { group: Number(e.target.value) },
        );
    };

    render() {
        return (
            <div
                className="select"
                onMouseDown={() => { this.props.getGroup(this.state.group); }}
                tabIndex="0"
                role="button"
            >

                <select
                    value={this.state.group}
                    onChange={(e) => this.handleChange(e)}
                >
                    <option value="0">Novice</option>
                    <option value="1">Apprentice</option>
                    <option value="2">Adept</option>
                    <option value="3">Expert</option>
                    <option value="4">Master</option>
                    <option value="5">Legendary</option>
                </select>
            </div>
        );
    }
}

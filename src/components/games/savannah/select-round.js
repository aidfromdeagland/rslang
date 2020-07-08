import React, { Component } from 'react';

export class SelectRound extends Component {
    constructor(props) {
        super(props);
        this.state = { page: this.props.page };
    }

    handleChange = (e) => {
        this.setState(
            { page: Number(e.target.value) },
        );
    };

    render() {
        const values = [...Array(30).keys()];
        return (
            <div
                className="select"
                tabIndex="0"
                role="button"
                onMouseUp={() => { this.props.getPage(this.state.page); }}
            >

                <select
                    value={this.props.page}
                    onChange={(e) => this.handleChange(e)}

                >
                    {values.map((i) => <option key={i}>{i + 1}</option>)}

                </select>
            </div>
        );
    }
}

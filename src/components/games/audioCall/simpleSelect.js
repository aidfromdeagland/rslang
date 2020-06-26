import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class SimpleSelect extends Component {
    render() {
        const {
            values, defaultValue, onChange,
        } = this.props;
        return (
            <select className="list" value={defaultValue} onChange={(e) => onChange(Number(e.target.value))}>
                {values.map((o) => <option key={o}>{o}</option>)}
            </select>
        );
    }
}

SimpleSelect.propTypes = {
    values: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    defaultValue: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

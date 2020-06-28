import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class SimpleSelect extends Component {
    render() {
        const {
            values, defaultValue, title, onChange,
        } = this.props;
        return (
            <label>
                {`${title}:`}
                <select className="list" value={defaultValue} title={title} onChange={(e) => onChange(Number(e.target.value))}>
                    {values.map((o) => <option key={o}>{o}</option>)}
                </select>
            </label>
        );
    }
}

SimpleSelect.defaultProps = {
    title: undefined,
};

SimpleSelect.propTypes = {
    values: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    defaultValue: PropTypes.number.isRequired,
    title: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

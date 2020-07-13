import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class SimpleSelect extends Component {
    render() {
        const {
            values, defaultValue, title, toolTip, onChange,
        } = this.props;
        return (
            <label htmlFor="list">
                {`${title}:`}
                <select className="list" value={defaultValue} title={toolTip} onChange={(e) => onChange(Number(e.target.value))}>
                    {values.map((o) => <option key={o}>{o}</option>)}
                </select>
            </label>
        );
    }
}

SimpleSelect.defaultProps = {
    title: '',
    toolTip: '',
};

SimpleSelect.propTypes = {
    values: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    defaultValue: PropTypes.number.isRequired,
    title: PropTypes.string,
    toolTip: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

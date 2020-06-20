import React, { Component } from 'react';
import './button.scss';
import PropTypes from 'prop-types';

export class Button extends Component {
    render() {
        const {
            className, isDisabled, onClick, title,
        } = this.props;
        return (
            <button
                className={className}
                disabled={isDisabled}
                onClick={onClick}
            >
                {title}
            </button>
        );
    }
}

Button.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
};

Button.defaultProps = {
    className: '',
};

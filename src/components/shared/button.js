import React, { Component } from 'react';
import './button.scss';
import PropTypes from 'prop-types';

export class Button extends Component {
    render() {
        const {
            className, isDisabled, onClick, title, children,
        } = this.props;
        return (
            <button
                className={className}
                disabled={isDisabled}
                onClick={onClick}
            >
                {title}
                {children}
            </button>
        );
    }
}

Button.propTypes = {
    title: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
    isDisabled: PropTypes.bool,
    children: PropTypes.node,
};

Button.defaultProps = {
    className: '',
};

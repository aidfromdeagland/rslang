import React, { Component } from 'react';
import './button.scss';
import PropTypes from 'prop-types';

export class Button extends Component {
    render() {
        const {
            className, isDisabled, onClick, title, children, toolTip,
        } = this.props;
        return (
            <button
                className={className}
                disabled={isDisabled}
                onClick={onClick}
                title={toolTip}
                type="button"
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
    toolTip: PropTypes.string,
};

Button.defaultProps = {
    className: '',
};

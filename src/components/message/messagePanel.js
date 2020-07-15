/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './messagePanel.scss';

export class MessagePanel extends Component {
    constructor(props) {
        super(props);
        const { text, isError } = this.props.message;
        this.state = { text, isError };
    }

    componentDidUpdate() {
        if (this.checkChangedProps()) {
            const { text, isError } = this.props.message;
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({ text, isError, hide: false });
        } else if (!this.state.hide) {
            setTimeout(() => {
                this.setState({ hide: true });
            });
        }
    }

    checkChangedProps() {
        const { message } = this.props;
        const { text, isError } = this.state;
        return message.text !== text || message.isError !== isError;
    }

    render() {
        const { text, isError, hide } = this.state;
        if (!text || text === '') {
            return null;
        }
        const calssModificatorType = isError ? 'message-panel_error' : 'message-panel_success';
        const calssModificatorHide = hide ? 'message-panel_hide' : '';
        return (
            <span className={`message-panel ${calssModificatorType} ${calssModificatorHide}`}>{text}</span>
        );
    }
}

MessagePanel.defaultProps = {
    message: {
        text: null,
        isError: true,
    },
};

MessagePanel.propTypes = {
    message: PropTypes.shape({
        text: PropTypes.string,
        isError: PropTypes.bool,
    }),
};

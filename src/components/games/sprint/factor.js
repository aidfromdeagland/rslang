import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './factor.scss';

export class Factor extends Component {
    render() {
        const { runners } = this.props;
        const divs = Array(runners).fill(1).map((item, index) => {
            return <div key={index} className="factor">&nbsp;</div>;
        });

        return (
            <div className="factors">
                <div className="factors_container">
                    { divs }
                </div>
            </div>
        );
    }
}

Factor.propTypes = {
    runners: PropTypes.number,
};

Factor.defaultProps = {
    runners: 1,
};

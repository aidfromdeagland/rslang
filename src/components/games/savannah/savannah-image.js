import React, { Component } from 'react';

export class SavannahImage extends Component {
    render() {
        const { imageWidth, imageHeight } = this.props;
        const styles = {
            width: `${imageWidth.toString()}px`,
            height: `${imageHeight.toString()}px`,
        };
        return (
            <div
                className="savannah__image"
                style={styles}
            />
        );
    }
}

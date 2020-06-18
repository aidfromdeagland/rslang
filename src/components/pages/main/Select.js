import React, { Component } from 'react';
import './main.scss';

export class Select extends Component {
    render() {
        const defaultNumber = 1;
        return (
            <div className="settings__options_container">
                <div className="selectbox selectbox--unselect" data-option="">
                    <div className="selectbox__displayWord selectbox-levels">Learn words a day: {defaultNumber}</div>
                    <div className="option-container option-container-levels">
                        <div class="option-container__option">
                            <input type="radio" class="option__radio" id="1" name="category" />
                            <label class="option__label" for="1">1</label>
                        </div>
                        <div class="option-container__option">
                            <input type="radio" class="option__radio" id="1" name="category" />
                            <label class="option__label" for="1">1</label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

import React from 'react';
import {TwitterPicker} from 'react-color';
import './ColorPickerComponent.scss'

export class ColorPickerComponent extends React.Component {
    state = {
        background: '#fff',
    };

    handleChangeComplete = (color) => {
        this.setState({background: color.hex});
    };

    render() {
        return (
            <TwitterPicker
                color={this.state.background}
                onChange={this.handleChangeComplete}
            />
        );
    }
}
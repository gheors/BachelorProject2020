import React from "react";
import './InputComponent.css'


function InputComponent(props) {

    const checkValueValidity = (currentValue) => {
        return true
    }

    const eventHandler = (event) => {
        if (checkValueValidity(event.target.value)) {
            console.log(event.target.value)
            props.updateStateValueFromInput(event.target.value)
        }
    }

    return (
            <div className={'inputDiv'}>
                <label className={"labelInput"}>{props.label}</label>
                <input placeholder={props.placeholder}
                       name={props.name}
                       className={'form-control2'}
                       onChange={eventHandler}>
                </input>

            </div>
    )
}

export default InputComponent
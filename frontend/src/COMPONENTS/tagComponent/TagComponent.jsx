import React from "react";
import "./TagComponent.css";
import {TiDelete} from "react-icons/ti";

export default function TagComponent(props) {

    return (
        <>
            {
                <div className={`tagDivWrapper ${props.WrapperTagAdjust}`}>
                    <div onClick={props.onclickTag} className={`textDivTag ${props.textDivTagAdjust}`}>{props.tag}</div>
                    <TiDelete onClick={props.onClickDelete} className={`deleteTagIcon ${props.deleteTagIconAdjust}`}/>
                </div>
            }
        </>
    );
};


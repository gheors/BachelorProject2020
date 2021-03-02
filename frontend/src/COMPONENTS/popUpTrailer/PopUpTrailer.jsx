import React, {Component, useState} from 'react';
import {Modal} from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import ReactPlayer from "react-player";
import "./PopUpTrailer.css";

export default function PopUpTrailer(props) {
    let [isOpen, setIsOpen] = useState(false)
    return (
        <div>
            <button className={`button ${props.buttonStyle} ${props.buttonSize}`}
                    onClick={() => setIsOpen(true)}>
                {props.children} <i className="far fa-play-circle"/>
            </button>
            <Modal className='popup_container' open={isOpen} onClose={() => setIsOpen(false)}>
                <h3>What is AiTiA ?</h3>
                <div className={'video_wrapper'}>
                    <ReactPlayer controls={true} width="100%" url="https://www.youtube.com/watch?v=oFDORuGOyTE"/>
                </div>
            </Modal>
        </div>
    );
}

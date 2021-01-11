import React, {useEffect, useRef, useState} from "react";

import "./RightBar.css";
import {BsFillCollectionPlayFill} from "react-icons/bs";
import SingleImageFI from "../SingleImageFI/SingleImageFI";
import Axios from "axios";
let imagesDelete = []

function RightBar(props) {
    const {folder, images} = props;
    const input = useRef(null)
    const [styleDelete, setStyleDelete] = useState({borderRadius: '50px', transition: '200ms'})
    const [flagDelete, setFlagDelete] = useState(false)

    let [counter, setCounter] = useState(0)


    const deleteIMagesSelection = () => {
        setFlagDelete(!flagDelete)
        if (flagDelete) {
            setStyleDelete({borderRadius: '50px', transition: '200ms', color: '#a9a9a9'})
            setCounter(0)
        } else {
            setStyleDelete({
                borderRadius: '50px',
                transform: 'rotateZ(90deg)',
                color: 'crimson',
                transition: '200ms'

            })
        }
    }

    return (
        <>
            <div className={"sideBarContainer"}>
                <nav className={"rightBar"}>
                    {images.length > 0 && <div className="nav-menu-items">
                        <div className="navbar-toggle">
                            {`${folder}`}
                            <div className={"iconWrapper"}>
                                <BsFillCollectionPlayFill/>
                            </div>
                        </div>
                        <div className={"imagesDivRight"}>
                            {images.length > 0 &&
                            images.map((image, index) => {
                                return (
                                    <SingleImageFI
                                        key={image.name + index + 'rightDisplay'}
                                        imagesDelete={imagesDelete}
                                        setCounter={setCounter}
                                        counter={counter}
                                        images={images}
                                        flagDelete={flagDelete} image={image}
                                        folder={folder} index={index}/>
                                );
                            })}
                        </div>
                        {flagDelete && <div className={'divDeleteSelected'}>
                            <div className={'infoCounterDeleteDiv'}><span
                                style={{color: 'crimson'}}>{counter}</span> images selected
                            </div>
                            <div className={'deleteSelectedButton'}
                                 onClick={() => {
                                     props.deleteSelectedImages(imagesDelete)
                                     setFlagDelete(false)
                                     imagesDelete = []
                                 }
                                 }>delete selected <i
                                className="fas fa-minus-circle"/></div>

                        </div>}
                        <input
                            placeholder={"Choose video to Build Collection"}
                            type="file"
                            style={{display: 'none'}}
                            className={"uploadImageDiv"}
                            onChange={(event) => props.selectImagesToUpload(event, folder, 'addImagesToFolder')}
                            accept="image/*"
                            ref={input}
                            multiple
                        />

                        <div className={"buttonWrapperRight"}>
                            <label htmlFor="test">
                                <div className={"addImagesWrapper"}>
                                    <div className={"addImage"}>
                                        <div className={"divIconRight"} onClick={() => input.current?.click()}>
                                            <i className="fas fa-upload"/>
                                        </div>
                                        <div className={"divIconRight"} style={styleDelete}
                                             onClick={() => deleteIMagesSelection()}>
                                            <i className="fas fa-minus-circle"/>
                                        </div>
                                    </div>

                                </div>
                            </label>
                        </div>
                    </div>}
                </nav>
            </div>
        </>
    );
}

export default RightBar;

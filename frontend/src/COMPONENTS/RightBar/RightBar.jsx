import React, {useEffect, useRef, useState} from "react";

import "./RightBar.css";
import {BsFillCollectionPlayFill} from "react-icons/bs";
import {FaLayerGroup} from "react-icons/fa";

import SingleImageFI from "../SingleImageFI/SingleImageFI";
import Axios from "axios";
import {Link} from "react-router-dom";

let imagesDelete = []

function RightBar(props) {
    const {folder, images} = props;
    const input = useRef(null)
    const [styleDelete, setStyleDelete] = useState({borderRadius: '50px', transition: '200ms'})
    const [flagDelete, setFlagDelete] = useState(false)

    let [counter, setCounter] = useState(0)

    useEffect(() => {
        if (!flagDelete) {
            setStyleDelete({borderRadius: '50px', transition: '200ms', color: '#212121'})
            setCounter(0)
            setFlagDelete(flagDelete)
        }
    }, [flagDelete, props.images])

    const deleteIMagesSelection = () => {
        setFlagDelete(!flagDelete)
        if (flagDelete) {
            setStyleDelete({borderRadius: '50px', transition: '200ms', color: '#212121'})
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
            <div className={"rightBar step_4_Folders"}>
                {images.length > 0 && <div className="">

                    <div className="navbar-toggle navbar-toggle2">
                        {`${folder}`}
                        <div className={"iconWrapperRight"}>
                            <FaLayerGroup/>
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
                                 setFlagDelete(!flagDelete)
                                 imagesDelete = []
                             }}
                        >
                            delete selected
                            <i className="fas fa-minus-circle"/>
                        </div>

                    </div>}

                    <input
                        type="file"
                        style={{display: 'none'}}
                        className={"uploadImageDiv"}
                        onChange={(event) => {
                            props.selectImagesToUpload(event, folder, 'addImagesToFolder')
                        }}
                        accept="image/*"
                        ref={input}
                        multiple
                    />

                    <div className={"buttonWrapperRight"}>
                            <div className={"divIconRight step_5_Folders"} onClick={() => input.current?.click()}>
                                <i className="fas fa-upload"/>
                            </div>
                            <div className={"divIconRight step_6_Folders"} style={styleDelete}
                                 onClick={() => deleteIMagesSelection()}>
                                <i className="fas fa-minus-circle"/>
                            </div>

                            <Link to={'./cropMainPage'}>
                                <div className={'goToCropButtonDiv step_7_Folders'}>
                                    <i className="fas fa-crop-alt iconGoToCrop"/>
                                </div>
                            </Link>
                    </div>
                </div>}
            </div>
        </>
    );
}

export default RightBar;

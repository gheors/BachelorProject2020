import React, {useState} from "react";
import "./LeftBarCropPage.css";
import "../../COMPONENTS/buttonCard/ButtonCardMenu.css";
import {BsPersonSquare} from "react-icons/bs";
import {GiCardExchange} from "react-icons/gi";

import {TiDelete} from "react-icons/ti";
import {colors} from "@material-ui/core";

export default function LeftBarCropPage(props) {

    const changeCollection = () => {
        props.setCurrentFolder(undefined)
        props.setCurrentFolderProps(undefined)
        props.setImagesArrayProps([])
    }

    const selectedImage = (image) => {
        props.setCurrentImage(image)
    }

    return (
        <>

            <div className={'leftDivCropPage step_1_Crop'}>
                <div className={'titleLftBarDiv'}>
                    <div className={'bastoneLeft'}>Current Collection</div>
                    {props.currentFolder}
                </div>

                <div className={"imagesDivLeftCrop"}>
                    {
                        props.imagesArray.map((image, index) => {

                            return (
                                <div key={props.currentFolder + image.name}
                                     onClick={() => selectedImage(image)}
                                     style={{
                                         boxShadow: image.name === props.currentImage.name ? " 0 0 2px 2px crimson" : "none",
                                     }}
                                     className={'imageCardLeftCrop'}>
                                    <img
                                        src={`./frames/${props.currentFolder}/${image.name}`}
                                        alt={"..."}
                                    />
                                    <div className={'imageCardLeftCropData'}>
                                        {<div
                                            className={image.name === props.currentImage.name ? 'numberPicture activeColor' : 'numberPicture'}>{index + 1}</div>}
                                        <div className={'imageCardLeftCropIconsDiv'}>
                                            {/*<div className={'imageCardLeftCropIconDelete'}><TiDelete/></div>*/}
                                            {image.used &&
                                            <div className={'imageCardLeftCropIcon'}><BsPersonSquare/></div>}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
                <div className={'infoTotalImagesLeft'}>
                    <div>Total: <span
                        style={{color: 'crimson', fontSize: '17px'}}>{props.imagesArray.length}</span> images
                    </div>
                </div>
                <div className={'changeCollectionDiv'}>
                    <button onClick={changeCollection} className={'buttonChangeCollection'}>
                        <GiCardExchange/> other Collection <GiCardExchange/>
                    </button>
                </div>
                <div className={'buttonTutorialDiv buttonTutorialCrop'}
                     onClick={() => props.setIsTourOpen(!props.isTourOpen)}>Tutorial
                </div>
            </div>
        </>
    );
}

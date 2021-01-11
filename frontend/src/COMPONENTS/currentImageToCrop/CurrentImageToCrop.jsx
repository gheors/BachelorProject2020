import React, {useState} from "react";
import "./CurrentImageToCrop.css";
import "../../COMPONENTS/buttonCard/ButtonCardMenu.css";
import CroppedSample from "../croppperSample/CropperSample";
import {IoIosArrowDropleftCircle} from "react-icons/io";
import {IoIosArrowDroprightCircle} from "react-icons/io";
import {BsPersonSquare} from "react-icons/bs";

export default function CurrentImageToCrop(props) {
    let index = props.imagesArray.indexOf(props.currentImage) + 1
    let src = `./frames/${props.currentFolder}/${props.currentImage.name}`
    let uniqueTags = []
    let [showCards, setShowCards] = useState(false)
    let [squareCrop, setSquareCrop] = useState(true)

    props.croppedCards.map(card => {
        return card.tags.map(tag => {
            if (!uniqueTags.includes(tag)) {
                uniqueTags.push(tag)
            }
        })
    })

    return (
        <>
            <div className={'displayCurrentImageContainer'}>
                {
                    <div className={'titleCurrentImage'}>
                        <div className={'bastoneLeft'}>Current Image</div>
                        <div className={'bottomTitleCurrentImage'}>
                            <div className={'cardsLabelCurrentImage'}>
                                <div> 2 cards</div>
                            </div>
                            <div className={'counterImages'}>
                                <div>{index}/{props.imagesArray.length}</div>
                            </div>
                            <div className={'usedImage'}>
                                <div>{props.currentImage.used ?
                                    <BsPersonSquare className={'activeUsed'}/>
                                    :
                                    <BsPersonSquare className={'inActiveUsed'}/>}</div>
                            </div>
                        </div>
                    </div>
                }
                {<CroppedSample
                    setCroppedUrl={props.setCroppedUrl}
                    setCroppedImage={props.setCroppedImage}
                    setCoordinates={props.setCoordinates}
                    croppedCards={props.croppedCards}
                    showCards={showCards}
                    squareCrop={squareCrop}
                    src={src}/>
                }
                <div className={'settingsCurrentImageDiv'}>
                    <div className={'leftArrowCurrent'}><IoIosArrowDropleftCircle/></div>
                    <div className={'centralSettings'}>
                        <div onClick={() => setSquareCrop(!squareCrop)}
                             className={'cropModeButton'}>{squareCrop ? 'crop 1/1' : 'free crop'}</div>
                        <div onClick={() => setShowCards(!showCards)}
                             style={showCards ? {backgroundColor: 'green'} : {backgroundColor: 'white'}}
                             className={'deleteButtonCurrent'}>cards
                        </div>
                        <div className={'deleteButtonCurrent'}>delete</div>

                    </div>
                    <div className={'rightArrowCurrent'}><IoIosArrowDroprightCircle/></div>
                </div>
                <div className={'generalInfo'}>
                    <div className={"generalInfoEl"}>Total Categories: <div
                        className={"generalInfoElNumber"}>{props.categories.length}</div></div>
                    <div className={"generalInfoEl"}>Total Cropped Images: <div
                        className={"generalInfoElNumber"}>{props.croppedCards.length}</div></div>
                    <div className={"generalInfoEl"}>Total Unique Tags: <div
                        className={"generalInfoElNumber"}>{uniqueTags.length}</div></div>
                </div>
            </div>
        </>
    );
}

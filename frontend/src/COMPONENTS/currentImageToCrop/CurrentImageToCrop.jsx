import React, {useState} from "react";
import "./CurrentImageToCrop.css";
import "../../COMPONENTS/buttonCard/ButtonCardMenu.css";
import CroppedSample from "../croppperSample/CropperSample";
import {IoIosArrowDropleftCircle} from "react-icons/io";
import {IoIosArrowDroprightCircle} from "react-icons/io";
import {BsPersonSquare} from "react-icons/bs";
import {GrLayer} from "react-icons/gr";
import {Badge} from "@material-ui/core";

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
            <div className={'centerCropPage step_8_Crop'}>
                <div className={'step_2_Crop'}>
                    {

                        <div className={'titleCurrentImage'}>
                            <div className={'bastoneLeft'}>DataSets Building</div>
                            <div className={'bottomTitleCurrentImage'}>
                                <div className={'cardsLabelCurrentImage'}>
                                    <div className={'currentImageCrop'}>Current Image</div>
                                </div>
                                <div className={'counterImages'}>
                                    <div>{index}/{props.imagesArray.length}</div>
                                </div>
                                <div className={'usedImage'}>
                                    <div>{props.currentImage.used ?
                                        <><Badge
                                            badgeContent={<div
                                                className={'totalCardsInfo'}>{props.croppedCards.length}</div>}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}><BsPersonSquare className={'activeUsed'}/></Badge> </>
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

                </div>

                <div className={'settingsCurrentImageDiv step_3_Crop'}>
                    <div className={'leftArrowCurrent'}><IoIosArrowDropleftCircle/></div>
                    <div className={'centralSettings '}>

                            {showCards ? <div className={'cropModeButtonDisabled step_4_Crop'}>
                                    <i className="fas fa-lock"/>
                                </div>
                                :
                                <div onClick={() => setSquareCrop(!squareCrop)}
                                     className={'cropModeButton step_4_Crop'}>
                                    {squareCrop ? <>
                                            crop <i className="far fa-square"/> </>
                                        :
                                        'free crop'}
                                </div>}


                        <div className={'AitiaCrop'}>AiTiA</div>
                        <div onClick={() => setShowCards(!showCards)}
                             style={showCards ?
                                 {backgroundColor: '#333333', fontWeight: '500'}
                                 :
                                 {
                                     backgroundColor: '#212121',
                                     color: '#a9a9a9',
                                 }}
                             className={'cardsButtonDiv'}>{
                            showCards ?
                                <> #<i className="fas fa-clone cardsActive"/></>
                                :
                                <> cards <i className="fas fa-eye"/></>}
                        </div>
                        {/*<div className={'deleteButtonCurrent'}>delete</div>*/}

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

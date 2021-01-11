import React, {useEffect} from "react";
import "./RightBarCardsComponent.css";
import "../../COMPONENTS/buttonCard/ButtonCardMenu.css";
import Badge from '@material-ui/core/Badge';

import {BsPersonSquare} from "react-icons/bs";
import TagComponent from "../tagComponent/TagComponent";
import {IoMdRemoveCircle} from "react-icons/io";

export default function RightBarCardsComponent(props) {
    const onTagClick = () => {
        console.log('tag Clicked Cropped Cards')
    }

    return (
        <>
            <div className={'rightBarCollectionsContainer'}>
                <div className={'titleCroppedCards'}>
                    Cropped Cards <BsPersonSquare style={{margin: '0 0 0 15px'}}/>
                </div>
                <div className={'croppedCardsDiv'}>
                    {props.croppedCards.map(croppedCard => {
                        const src = `./croppedImages/${croppedCard.name}`
                        return <div key={croppedCard.name} className={'croppedCardDiv'}>
                            <Badge
                                overlap="circle"
                                badgeContent={<i className="fas fa-minus-circle deleteCurrentCardCropIcon"
                                                 onClick={() => props.removeCroppedCard(croppedCard.name, props.folderId, props.fullImageName)}/>}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                <div className={'imageCardWrapper'}>
                                    <img alt={'...'} src={src}/>
                                </div>
                            </Badge>

                            <div className={'tagsCroppedImageWrapper'}>
                                <div className={'tagsCroppedImage'}>
                                    {croppedCard.tags.map((tag, index) => {
                                        console.log(tag)
                                        if (tag !== undefined) {
                                            return <TagComponent
                                                key={tag + index}
                                                tag={tag} onclickTag={onTagClick}
                                                onClickDelete={() => props.deleteTagFromCard(croppedCard.name, tag)}/>
                                        }
                                    })}
                                </div>
                                <div className={'divButtonsCroppedCard'}>
                                    <div className={'buttonUpdateCategory'}>update</div>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </>
    );
}

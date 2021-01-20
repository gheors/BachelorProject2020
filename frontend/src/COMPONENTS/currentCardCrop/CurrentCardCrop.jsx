import React, {useEffect, useState} from "react";
import "./CurrentCardCrop.css";
import "../../COMPONENTS/buttonCard/ButtonCardMenu.css";
import {AiOutlineIdcard} from "react-icons/ai";
import TagComponent from "../tagComponent/TagComponent";

export default function CurrentCardCrop(props) {

    const deleteCurrentTag = (tag) => {
        const tags = props.currentTags.filter(t => t !== tag)
        props.setCurrentTags(tags)
    }

    return (
        <>
            <div className={'currentTagBuildingContainer'}>
                <div className={'titleBarWrapper'}>
                    <div className={'titleCurrentCardCrop'}>
                        Current Card
                    </div>
                    <button className={'saveButtonCroppedImage'} onClick={() => props.uploadCurrentCrop()}> save
                    </button>
                </div>
                <div className={'imageCardBoxCrop'}>
                    {props.croppedUrl !== undefined && <img
                        className={"currentCard"}
                        src={props.croppedUrl}
                        alt={"..."}
                    />}
                </div>
                <div className={'currentTagsDiv'}>
                    <div className={'titleTags'}>current tags</div>
                    <div className={'currentTags'}>
                        {props.currentTags.map(tag => {
                                return <TagComponent
                                    key={tag + 'current'}
                                    currentTags={props.currentTags}
                                    tag={tag}
                                    textDivTagAdjust={'textDivTagAdjustCurrentCrop'}
                                    onClickDelete={() => deleteCurrentTag(tag)}
                                />
                            }
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

import React from "react";
import * as MdIcons from "react-icons/md";
import {FaPen} from "react-icons/fa";

export const tutorialSteps = [
    {
        selector: '.step_1_Folders',
        content: <>
            <div className={'step_1_Folders_Content'}>
                <div className={'descriptionStep collectionTourHeight'}>
                    <span style={{textWeight: 'bold'}}>Collection List</span><br/>
                    Here on the left we have images collections, these images are necessary for training the AI.<br/>
                    <br/>
                    <span style={{textWeight: 'bold', color: '#007aff'}}>Collection example</span>

                    <div className={'collectionExample'}>
                        {/*<div>Add new Videos </div>*/}
                        <img src={'images/collectionx.png'} alt={'...'}/>
                        <i className="fas fa-long-arrow-alt-right arrowCollections"/>
                        <i className="fas fa-crop-alt "/>
                    </div>
                    <br/>
                    You are allowed to: <br/>
                    <ul className={"ulCollection"}>
                        <li><span style={{textWeight: 'bold'}}>change</span> collection name <i
                            className="fas fa-pen collectionModifyExample"/></li>
                        <li><span style={{textWeight: 'bold'}}>delete</span> collection <i
                            className="fas fa-minus-circle collectionRemoveExample"/></li>

                    </ul>
                    <br/>
                </div>

            </div>

        </>
        ,
    },
    {
        selector: '.step_2_Folders',
        content: <div className={'descriptionStep'}>
            <span style={{textWeight: 'bold'}}>Add new Collection</span> allows you to insert the name of the collection
            you are crating
            and then by clicking on <i className="fas fa-upload"/> you will upload the images you want inside the new
            collection.
        </div>
    },
    {
        selector: '.step_3_Folders',
        content: <div className={'descriptionStep adjustDescriptionWidth'}>
            <span style={{textWeight: 'bold'}}>Collection Visualization</span> allows you to watch your collection.
            IN order to move between images you can:
            <ul className={"ulCurrentImages"}>
                <li>use the arrows on display
                    <i className="fas fa-chevron-left"/>
                    <i className="fas fa-chevron-right"/>
                </li>
                <li>use keyboard's arrows <img className={'adjustButtonsKey'} src={'images/arrows.png'} alt={'...'}/>
                </li>
                <li> swipe <img src={'images/swipe.png'} alt={'...'}/>
                </li>

            </ul>
        </div>,
    },
    {
        selector: '.step_4_Folders',
        content: <div className={'descriptionStep'}>
            <span style={{textWeight: 'bold'}}>Control Area - add, delete, visualize</span><br/>
            In this section you can <span style={{textWeight: 'bold'}}>visualize</span> your images in faster way and
            you can also <span style={{textWeight: 'bold'}}>add </span>new images if needed or you can <span
            style={{textWeight: 'bold'}}>throw away</span> images that are not necessary:
            <ul className={"ulRight"}>
                <li><span style={{textWeight: 'bold'}}>add new </span>
                    images by picking
                    <span style={{marginRight: '15px'}}/>
                    <i className="fas fa-upload"/>
                </li>
                <li><span style={{textWeight: 'bold'}}>delete </span>images by picking
                    <span style={{marginRight: '15px'}}/>

                    <i className="fas fa-minus-circle collectionRemoveExample"/>

                </li>

            </ul>
        </div>
    },
    {
        selector: '.step_5_Folders',
        content: <div className={'descriptionStep'}>
            <span style={{textWeight: 'bold', marginRight: '15px'}}>Add new Images</span><i
            className="fas fa-upload" style={{marginRight: '10px'}}/> <br/>to current collection.
        </div>
    },
    {
        selector: '.step_6_Folders',
        content: <div className={'descriptionStep'}>
            <span style={{textWeight: 'bold', marginRight: '15px'}}>Remove existing images by picking</span>
            <br/>
            <span style={{textWeight: 'bold', color: '#007aff'}}>Preview</span><br/>
            <img className={'multiDeleteExample'} src={'images/multiDelete.png'} alt={'...'}/>
        </div>
    },
    {
        selector: '.step_7_Folders',
        content: <div className={'descriptionStep'}>
            Go to
            <span style={{textWeight: 'bold', marginRight: '15px'}}> DataSet Building page</span><br/> Is the place
            where you tag images before the Training part:
            <div style={{marginTop: '10px'}}>
                <span style={{textWeight: 'bold', color: '#007aff'}}>Preview</span><br/>
                <div className={"dataSetBuildingTDiv"}>
                    <img className={'multiDeleteExample'} src={'images/dataSetBuilding.png'} alt={'...'}/>
                    <img className={'multiDeleteExample'} src={'images/dataSetBuildingPage.png'} alt={'...'}/>
                </div>
            </div>


        </div>
    },
]
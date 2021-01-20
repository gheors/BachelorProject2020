import React from "react";

export const tutorialSteps = [
    {
        selector: '.step_1_Main',
        content: <>
            <div className={'step_1_Main_Content'}>
                <div className={'descriptionStep'}><span style={{textWeight: 'bold'}}>The first step</span>, in order to train and use your baby AI, is to upload
                    <span style={{textWeight: 'bold'}}> videos</span> or <span style={{textWeight: 'bold'}}>images</span> that contain elements you want to be recognized.<br/>
                    <span className={'Example'}>Example:</span> <br/>You want that your AI is able to recognize a  <span style={{textWeight: 'bold'}}>cat</span> or
                    a  <span style={{textWeight: 'bold'}}>dog</span> then that means the images and video you must add are about <br/>
                    dogs or cars or even both.
                </div>
                <div className={'step_1_Main_cardsDiv'}>
                    <div>
                        {/*<div>Add new Videos </div>*/}
                        <img src={'images/Cani.jpg'} alt={'...'}/>
                    </div>
                    <div>
                        {/*<div>Add Images</div>*/}
                        <img src={'images/gatto.jpg'} alt={'...'}/>
                    </div>
                    <div className={"wrongChoice"}>
                        <div className={'notRecommended'}>not recommended</div>
                        <img src={'images/caniGatti.jpg'} alt={'...'}/>
                    </div>
                </div>
            </div>

        </>,
    },
    {
        selector: '.step_2_Main',
        content: <div className={'descriptionStep heightDescription'}><span style={{textWeight: 'bold'}}>The second step</span> refers to the main tool
            for producing
            datasets. A <span style={{textWeight: 'bold'}}>DataSet</span> is just a collection of something that you
            want use to train your <span style={{textWeight: 'bold'}}>Artificial Intelligence</span>, in this
            application a DataSet is represented by <span style={{textWeight: 'bold'}}>images</span> and each image has
            a <span style={{textWeight: 'bold'}}>name</span> or tag (<span
                style={{fontStyle: 'italic'}}>label</span> ).<br/>
            <span className={'Example2'}>Example:</span> <br/><br/>
            <div className={'step_2_Main_cardsDiv'}>
                <div className={'step_2_Main_category'}>
                    <div className={"step_2_label"}>category example: <span style={{color: 'rgb(255 157 9)'}}>Gender</span></div>
                    <img src={'images/category.png'} alt={'...'}/>
                </div>
                <div className={'step_2_Main_tag'}>
                            <div className={"step_2_label"}>tag example: <span style={{color: '#007aff'}}>#male</span></div>
                    <img src={'images/tagExample.png'} alt={'...'}/>
                </div>
            </div>
        </div>
    },
    {
        selector: '.step_3_Main',
        content: 'training the AI',
    },
    {
        selector: '.step_4_Main',
        content: 'test the AI',
    },
]
import React from "react";

export const tutorialSteps = [
    {
        selector: '.step_1_Crop',
        content: <div className={'step_1_Crop_Content'}>
            <span style={{textWeight: 'bold'}}>Current Collection</span>
            <div className={'descriptionStep'}>
                Here you can <span style={{textWeight: 'bold'}}>visualize</span> each single image
                that belongs to the selected collection.

                <div className={'changeCollectionTDiv'}>
                    <div>
                        This button allows you to <span style={{textWeight: 'bold'}}>change</span><br/> the
                        current <span style={{textWeight: 'bold'}}>collection</span> if needed.
                    </div>
                    <img className={'changeColl'} src={'images/changeCollection.png'} alt={'...'}/>
                </div>
            </div>

        </div>,
    },
    {
        selector: '.step_2_Crop',
        content: <div className={'step_1_Crop_Content'}>
            <div className={'descriptionStep'}>
                <span style={{textWeight: 'bold'}}>The Selection part</span><br/>
                Select the area containing the element your Ai should learn to recognize.
                <div className={'changeCollectionTDiv'}>
                    <div>
                        <span style={{textWeight: 'bold', color: '#007aff'}}>Correct selection example</span><br/>
                        The <span style={{textWeight: 'bold'}}>Ai</span> is going to <span
                        style={{textWeight: 'bold'}}>learn</span> what is inside the
                        <span style={{textWeight: 'bold'}}> selected area</span>. <br/><br/>
                        <span style={{textWeight: 'bold', color: 'rgb(255 157 9)'}}>The next step</span><br/>
                        Give an appropriate <span style={{textWeight: 'bold'}}>name/tag</span> to your selection.
                    </div>
                    <img className={'imageSelect'} src={'images/selection.png'} alt={'...'}/>
                </div>
            </div>
        </div>
    },
    {
        selector: '.step_3_Crop',
        content: <div className={'descriptionStep adjustDescriptionWidth'}>
            <span style={{textWeight: 'bold'}}>Change Image Commands</span>
            <ul className={"ulCurrentImages"}>
                <li>use the arrows on <span style={{textWeight: 'bold'}}>display</span>
                    <img className={'arrowsCrop'} src={'images/arrowsSelection.png'} alt={'...'}/>
                </li>
                <li>use <span style={{textWeight: 'bold'}}>keyboard</span>'s arrows <img className={'adjustButtonsKey'}
                                                                                         src={'images/arrows.png'}
                                                                                         alt={'...'}/>
                </li>
                <li> click directly an image on the <span style={{textWeight: 'bold'}}>left bar</span>.
                </li>
            </ul>
        </div>
    },
    {
        selector: '.step_4_Crop',
        content: <div className={'descriptionStep adjustDescriptionWidth'}>
            <span style={{textWeight: 'bold'}}>The Selection Mode</span><br/>
            There are 2 ways for selecting the interested area
            <div className={'changeCollectionTDiv'}>
                <div>
                    1. <span style={{textWeight: 'bold'}}>Click</span> &
                    <span style={{textWeight: 'bold'}}> release</span> <span
                    style={{textWeight: 'bold', color: 'rgb(255 157 9)'}}>square</span>
                </div>
                <img className={'squareCropT'} src={'images/selection.png'} alt={'...'}/>
            </div>

            <div className={'changeCollectionTDiv fixeDHeight'}>
                <div style={{position: "relative", bottom: "35px"}}>
                    2. <span style={{textWeight: 'bold'}}>Click</span> &
                    <span style={{textWeight: 'bold'}}> release</span> <span
                    style={{textWeight: 'bold', color: '#007aff'}}>free</span>
                </div>
                <img className={'freeCropT'} src={'images/onClickRelease.png'} alt={'...'}/>
            </div>
        </div>
    },
    {
        selector: '.step_5_Crop',
        content: <div className={'step_1_Crop_Content'}>
            <div className={'descriptionStep'}>
                <span style={{textWeight: 'bold'}}>Add new Category </span><br/>
                A <span style={{textWeight: 'bold'}}>category</span> is a <span
                style={{textWeight: 'bold'}}>group</span> of <span style={{textWeight: 'bold'}}>elements</span> that
                have particular <span style={{textWeight: 'bold'}}>shared characteristics. </span><br/>
                <div style={{marginTop: '10px'}} className={'Example'}>Movie Roles</div>
                <ul className={'ulCategory'}>
                    <li>#protagonist <img className={'imageRole'} src={'images/protagonist.jpg'} alt={'...'}/></li>
                    <li>#antagonist <img className={'imageRole'} src={'images/antagonist.jpg'} alt={'...'}/></li>
                    <li>#secondary <img className={'imageRole'} src={'images/secondary.jpg'} alt={'...'}/></li>
                </ul>
                <div className={'divStepsCategory'}>
                    <div>
                        <span className={'Example'}>4 easy steps</span>
                        <ol className={'olCategory'}>
                            <li>insert category <span style={{textWeight: 'bold'}}>name</span> (ex: <span
                                style={{textWeight: 'bold'}}>Roles</span>)
                            </li>
                            <li>insert <span style={{textWeight: 'bold'}}>tag</span> (ex: <span
                                style={{textWeight: 'bold'}}>Protagonist</span>)
                            </li>
                            <li>select color for category</li>
                            <li><span style={{textWeight: 'bold'}}>click +</span> to add category</li>
                        </ol>
                    </div>
                    <img className={'categoryRoles'} src={'images/category2.png'} alt={'...'}/>
                </div>

            </div>

        </div>
    },
    {
        selector: '.step_6_Crop',
        content: <div className={'step_1_Crop_Content'}>
            <span style={{textWeight: 'bold'}}>Add other tags</span>
            <div className={'descriptionStep marginAddTagsTutorial'}>
                A category usually contains more than 1 tag.<br/><br/>
                A <span className={'boldCut'}>DataSet</span> is a <span
                className={'boldCut'}>collection</span> of <span className={'boldCut'}>images</span> (in our
                case):
                <div className={'dataSetTutorial'}>
                    <span className={'titleTourDataSet'}>Roles dataSet</span> <span className={'totalImageTut'}>total images</span>
                    <span> 10</span>
                    <div className={'dataSetTutorialImages'}>

                        <div className={'singleTagT'}>
                            <div>#protagonist</div>
                            <img className={''} src={'images/tutorial/protag1.jpg'} alt={'...'}/>
                        </div>
                        <div className={'singleTagT'}>
                            <div>#secondary</div>
                            <img className={''} src={'images/tutorial/second1.jpg'} alt={'...'}/>
                        </div>
                        <div className={'singleTagT'}>
                            <div>#protagonist</div>
                            <img className={''} src={'images/tutorial/protag2.jpg'} alt={'...'}/>
                        </div>
                        <div className={'singleTagT'}>
                            <div>#antagonist</div>
                            <img className={''} src={'images/tutorial/antag1.jpg'} alt={'...'}/>
                        </div>
                        <div className={'singleTagT'}>
                            <div>#protagonist</div>
                            <img className={''} src={'images/tutorial/protag3.jpg'} alt={'...'}/>
                        </div>
                    </div>

                    <div className={'dataSetTutorialImages'}>
                        <div className={'singleTagT'}>
                            <div>#protagonist</div>
                            <img className={''} src={'images/tutorial/protag4.jpg'} alt={'...'}/>
                        </div>
                        <div className={'singleTagT'}>
                            <div>#antagonist</div>
                            <img className={''} src={'images/tutorial/antag2.jpg'} alt={'...'}/>
                        </div>
                        <div className={'singleTagT'}>
                            <div>#protagonist</div>
                            <img className={''} src={'images/tutorial/protag5.jpg'} alt={'...'}/>
                        </div>
                        <div className={'singleTagT'}>
                            <div>#antagonist</div>
                            <img className={''} src={'images/tutorial/antag3.jpg'} alt={'...'}/>
                        </div>
                        <div className={'singleTagT'}>
                            <div>#secondary</div>
                            <img className={''} src={'images/tutorial/second2.jpg'} alt={'...'}/>
                        </div>
                    </div>
                </div>
                <div className={'italicText'}>
                    an image is composed by the image itself and its <span style={{color: '#de535f'}}>tag</span>.
                </div>
                <span style={{color: 'crimson'}} className={'boldCut'}>All the images inside a Dataset belongs to the same category!!</span>
            </div>
            <span className={'tourClickTagText'}><span style={{textWeight: 'bold'}}>Click</span> an appropriate <span
                style={{textWeight: 'bold'}}>tag</span> for the current card</span>
            <div className={'tourTagging'}>
                <img className={'categoryActiveTour'} src={'images/categoryActive.png'} alt={'...'}/>
                <i className="fas fa-long-arrow-alt-right posTagging"/>
                <img className={'currentCardTour'} src={'images/currentCard.png'} alt={'...'}/>
            </div>
        </div>,
    },
    {
        selector: '.step_7_Crop',
        content: <div className={'step_1_Crop_Content'}>
            <div className={'descriptionStep'}>
                <span style={{textWeight: 'bold'}}>The Selected Card</span><br/>
                Save the card into the dataSet

                <div className={'changeCollectionTDiv'}>
                    <div>
                        A <span style={{textWeight: 'bold'}}>Single Card</span> can have <span
                        style={{textWeight: 'bold'}}>different tags</span><br/> that belong to <span
                        style={{textWeight: 'bold'}}>different categories</span><br/><br/>
                        The fact that you can give <span style={{textWeight: 'bold'}}>multiple tags</span> to a single
                        card means you are producing <span style={{textWeight: 'bold'}}>multiple dataSets</span> at
                        once.<br/><br/>
                        Each<span style={{textWeight: 'bold'}}> dataSet </span>will contain a
                        <span style={{textWeight: 'bold'}}> copy </span>of the current
                        <span style={{textWeight: 'bold'}}>  Card</span>.

                    </div>
                    <img className={'currentCardTour2'} src={'images/currentCard2.png'} alt={'...'}/>
                </div>
            </div>

        </div>,
    },
    {
        selector: '.step_8_Crop',
        content: <div className={'step_1_Crop_Content'}>
            <span style={{textWeight: 'bold'}}>Result Visualization</span>

            <div className={'descriptionStep'}>
                Now you can <span style={{textWeight: 'bold'}}>visualize</span> the full image with the its <span
                style={{textWeight: 'bold'}}>cards</span> and
                <span style={{textWeight: 'bold'}}>tags</span>.

                <div className={'changeCollectionTDiv'}>
                    <div>
                        <span style={{textWeight: 'bold'}}>Click</span> this button to <span
                        style={{textWeight: 'bold'}}>check</span> the
                        <span style={{textWeight: 'bold'}}> selection result</span>.
                    </div>
                    <img className={'clickCards'} src={'images/clickCards.png'} alt={'...'}/>
                </div>
                <img className={'showTags'} src={'images/showTags.png'} alt={'...'}/>

            </div>

        </div>,
    },

]
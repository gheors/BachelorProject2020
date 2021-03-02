import React from "react";

export const tutorialSteps = [
    {
        selector: '.step_1_Video',
        content: <>
            <div key={'step_1_Video'} className={'step_1_Video_Content'}>
                <div className={'descriptionStep marginAdjustVideo'}>The Add button allows you to upload a video or a
                    list of videos from the memory of your device.
                    <br/>
                    <span style={{textWeight: 'bold', color: '#007aff'}}>Preview Example</span>

                </div>
                <div className={'step_1_Video_ImageDiv'}>
                    <div style={{position: 'relative'}}>
                        <img className={'uploadHint'} src={'images/uploadHint.png'} alt={'...'}/>
                        <img src={'images/preview.png'} alt={'...'}/>
                    </div>
                </div>
            </div>

        </>,
    },
    {
        selector: '.step_2_Video',
        content: <div  key={'step_2_Video'} className={'descriptionStep heightDescription'}>
            <div className={'gifDivText'}>
                <div className={"textDiv"} style={{maxWidth: '320px'}}>
                    <span style={{textWeight: 'bold'}}>Video Fragmentation </span>
                    gives the possibility to decompose the video in frames.
                    A <span style={{textWeight: 'bold'}}>video</span> is a <span
                    style={{textWeight: 'bold'}}>sequence</span> of <span
                    style={{textWeight: 'bold'}}>frames</span> reproduced one after one
                    in a really small amount of time. The same idea as a <span
                    style={{textWeight: 'bold'}}>flip-book</span>
                    <i className="fas fa-long-arrow-alt-right"/>
                </div>
                <div className={'videoCover'}>
                    <iframe src="https://giphy.com/embed/l4JyPZdWfyPY3if7O" className="giphy-embed" allowFullScreen/>
                </div>
            </div>
            <br/>
            A <span style={{textWeight: 'bold'}}>movie</span> as Shrek is composed by <span
            style={{textWeight: 'bold'}}>24 frames</span> per second (each
            second we actually see 24 images in a fast sequence).
            You are allowed to get from <span style={{textWeight: 'bold'}}>1</span> to <span
            style={{textWeight: 'bold'}}>8</span> frames per second, if a video is 20 seconds long than the final
            <div style={{display: 'flex'}}>
                <div className={'descriptionSegmentation'}>
                    number of frames created are <br/>
                    <span style={{textWeight: 'bold'}}>frameRate</span> x
                    <span style={{textWeight: 'bold'}}> videoLength</span>.
                    <div className={'extractTutorialDiv'}>
                        <img src={'images/extract.png'} alt={'...'}/>
                    </div>

                </div>
                <div className={'schemaFragmentation'}>
                    <img src={'images/fragmentation.png'} alt={'...'}/>
                </div>

            </div>
            <i className="fas fa-long-arrow-alt-right arrow2Fragmentation"/>
        </div>

    },
    {
        selector: '.step_3_Video',
        content: <div  key={'step_3_Video'} className={'descriptionStep'}>
            <span style={{textWeight: 'bold'}}>Collection images page</span><br/>
            All your <span style={{textWeight: 'bold'}}>frames</span> from a video will be <span style={{textWeight: 'bold'}}>available</span> there once the fragmentation finishes its task.
            <div className={'goToFolders'}>
                <img src={'images/goFolders.png'} alt={'...'}/>
            </div>
        </div>,
    },
]
import React, {useContext, useEffect, useState} from 'react';
import './InputVideos.css'
import '../../App.css'
import UploadVideosComponent from '../../COMPONENTS/videoUploads/UploadMultiplevideos'
import 'rc-slider/assets/index.css';
import VideoCard from "../../COMPONENTS/videoCard/VideoCard";
import ParticlesBackground from "../../COMPONENTS/particels/ParticelsBackground";
import {Link} from "react-router-dom";
import TutorialComponent from "../../COMPONENTS/tutorialComponent/TutorialComponent";
import {tutorialSteps} from "./tutorial_Input_Videos";
import {getExistingVideos} from "./ResourcesServices";
import {Context} from "../../Context";

export default function InputVideos(props) {

    const {videos, setVideos, setFolders} = useContext(Context)
    const [loadings, setLoadings] = useState([])
    const [isTour, setIsTour] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const videosDB = await getExistingVideos()
            setVideos(videosDB);
        };
        fetchData().then(() => console.log(videos))
    }, []);

    // useEffect(() => {
    //     (async () => {
    //         const videosDB = await getExistingVideos()
    //         return setVideos(videosDB);
    //     })()
    //         .then(() => console.log(videos))
    // }, []);


    const addVideo = (newVideos) => {
        setVideos([...videos, ...newVideos])
        setLoadings([...loadings, ...(new Array(newVideos.length).fill(false))])
    }

    const deleteVideoWeb = (video) => {
        setVideos(videos.filter(element => element !== video))
    }

    const setCollections = (data) => {
        props.setCollections(data)
    }

    return (
        <>
            <ParticlesBackground/>
            <TutorialComponent setIsTourOpen={setIsTour} isTourOpen={isTour}
                               tutorialSteps={tutorialSteps}/>

            <div className='containerAllVideosPage'>
                <UploadVideosComponent addVideo={addVideo}/>

                <div className={"allVideos"}>
                    {videos.map((video, index) => {
                        return <div key={video.name} className={index > 0 ? '' : 'step_2_Video'}>
                            <VideoCard
                                deleteVideoWeb={deleteVideoWeb}
                                video={video}
                                key={video.name}
                                loading={loadings[index]}
                                setCollections={setCollections}
                            />
                        </div>
                    })}
                    {videos.length === 0 &&
                    <div className={'noVideosDiv'}>Upload at least one video.</div>}
                </div>
                <div className={'buttonTutorialDiv'} onClick={() => setIsTour(!isTour)}>
                    Tutorial
                </div>

                <Link to={'/addNewResources'}>
                    <div className={'backArrowDiv'}>
                        <i className="fas fa-long-arrow-alt-left"/>
                    </div>
                </Link>
                <div className={'onVideoDiv'}>
                    <img className={'onVideo'} src={'images/videos2.png'} alt={'...'}/>
                </div>
                <Link to={'/foldersInterface'}>
                    <div className={'goFolderImage  step_3_Video'}>
                        <i className="fas fa-images"/>
                    </div>
                </Link>
            </div>
        </>
    )
}

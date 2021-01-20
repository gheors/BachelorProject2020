import React, {Component, useState} from 'react';
import './InputVideos.css'
import '../../App.css'
import UploadVideosComponent from '../../COMPONENTS/videoUploads/UploadMultiplevideos'
import 'rc-slider/assets/index.css';
import VideoCard from "../../COMPONENTS/videoCard/VideoCard";
import ParticlesBackground from "../../COMPONENTS/particels/ParticelsBackground";
import {Link} from "react-router-dom";
import {BsArrowReturnLeft} from "react-icons/bs";
import TutorialComponent from "../../COMPONENTS/tutorialComponent/TutorialComponent";
import {tutorialSteps} from "./tutorial_Input_Videos";

class InputVideos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allVideos: [],
            loadings: [],
            isTourOpen: false


        };
        this.deleteVideoWeb = this.deleteVideoWeb.bind(this)

    }


    componentDidMount() {
        fetch('/api/videos')
            .then(res => res.json()).then(videos => {
            this.setState({allVideos: videos, loadings: new Array(videos.length).fill(false)})
        })
    }


    // function used to add video without refresh
    addVideo = (videos) => {
        this.setState({
            allVideos: [...this.state.allVideos, ...videos],
            loadings: [...this.state.loadings, ...(new Array(videos.length).fill(false))],
        })
    }

    deleteVideoWeb = (video) => {
        let array = this.state.allVideos
        let newLoadings = this.state.loadings
        let index = array.indexOf(video)
        array.splice(index, 1);
        newLoadings.splice(index, 1);

        this.setState({
            allVideos: array,
            loadings: newLoadings,
        })
    }

    setCollections = (data) => {
        this.props.setCollections(data)
    }

    setIsTourOpen = (value) => {
        this.setState({
            isTourOpen: value
        })
    }

    render() {
        return (
            <>
                <ParticlesBackground/>
                <TutorialComponent setIsTourOpen={this.setIsTourOpen} isTourOpen={this.state.isTourOpen}
                                   tutorialSteps={tutorialSteps}/>

                <div className='containerAllVideosPage'>
                    <UploadVideosComponent addVideo={this.addVideo} allVideos={this.state.allVideos}/>

                    <div className={"allVideos"}>
                        {this.state.allVideos.map((video, index) => {
                            return <div className={index > 0 ? '' : 'step_2_Video'}>
                                <VideoCard
                                    deleteVideoWeb={this.deleteVideoWeb}
                                    video={video}
                                    key={video.name}
                                    loading={this.state.loadings[index]}
                                    setCollections={this.setCollections}
                                />
                            </div>
                        })}
                        {this.state.allVideos.length === 0 &&
                        <div className={'noVideosDiv'}>Upload at last one video.</div>}
                    </div>
                    <div  className={'buttonTutorialDiv'} onClick={() => this.setIsTourOpen(true)}>
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
        );
    }


}


export default InputVideos;
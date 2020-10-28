import React, {Component} from 'react';
import './allVideos.css'
import '../../App.css'
import {css} from "@emotion/core";
import UploadVideosComponent from '../../components/videoUploads/UploadMultiplevideos'
import 'rc-slider/assets/index.css';
import VideoCard from "../../components/videoCard/VideoCard";

class AllVideos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allVideos: [],
            loadings: [],

        };
        this.addVideo = this.addVideo.bind(this)
    }

    componentDidMount() {
        fetch('/api/videos')
            .then(res => res.json()).then(videos => {
            this.setState({allVideos: videos, loadings: new Array(videos.length).fill(false)})
            console.log(videos)
        })
    }


    // function used to add video without refresh
    addVideo(video) {
        console.log(video)
        this.setState({
            allVideos: [...this.state.allVideos, video],
            loadings: [...this.state.loadings, false],
        })
    }

    render() {
        return (
            <div className='containerAllVideosPage'>
                <UploadVideosComponent addVideo={this.addVideo}/>
                <div className="allVideosWrapper">
                        {this.state.allVideos.map((video, index) =>
                            <VideoCard video={video} key={video._id} loading={this.state.loadings[index]}/>
                        )}
                </div>
            </div>
        );
    }


}


export default AllVideos;
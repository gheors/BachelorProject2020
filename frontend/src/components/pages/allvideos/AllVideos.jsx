import React, {Component} from 'react';
import ReactPlayer from "react-player";
import './allVideos.css'
import '../../../App.css'
import {Button} from "../../button/Button";
import {HashLoader} from "react-spinners";
import {css} from "@emotion/core";

const override = css`
        display: in-block;
        `;

class AllVideos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allVideos: [],
            loadings: []
        };
    }

    componentDidMount() {
        fetch('/api/videos').then(res => res.json()).then(videos => {
            this.setState({allVideos: videos, loadings: new Array(videos.length).fill(false)})
            console.log(videos)
        })
    }

    runFragmentation(video, index) {
        const loadings = [...this.state.loadings]
        loadings[index] = true;
        this.setState(({loadings}))
        fetch(`/api/videos/${video.name}?frameRate=1`).then(res => res.json()).then(() => {
            loadings[index] = false;
            this.setState(({loadings}))
        })
    }

    render() {
        return (
            <>
                <video className="video_background" src="/videos/video-2.mp4" autoPlay loop muted/>
                <div className="allVideosWrapper">
                    <div className='allVideosContainer'>
                        {this.state.allVideos.map((video, index) =>
                            <div key={video._id} className='wrapper'>
                                <ReactPlayer className='reactPlayer' controls url={`/videos/${video.name}`}/>
                                <Button buttonStyle="button-outline" buttonSize='button-large'
                                        onClick={() => this.runFragmentation(video, index)}>
                                    start fragmentation <HashLoader css={override} loading={this.state.loadings[index]} size={25} color={"#ccff00"}/>
                                </Button>

                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    }
}

export default AllVideos;
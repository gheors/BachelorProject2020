import React, {Component} from 'react';
import './InputVideos.css'
import '../../App.css'
import UploadVideosComponent from '../../COMPONENTS/videoUploads/UploadMultiplevideos'
import 'rc-slider/assets/index.css';
import VideoCard from "../../COMPONENTS/videoCard/VideoCard";
import ParticlesBackground from "../../COMPONENTS/particels/ParticelsBackground";
import {Link} from "react-router-dom";
import {BsArrowReturnLeft} from "react-icons/bs";

class InputVideos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allVideos: [],
            loadings: [],


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
        this.props.setCollections(...this.props.collections, data)
    }

    render() {
        return (
            <>
                <div className='containerAllVideosPage'>
                    <ParticlesBackground/>
                    <UploadVideosComponent addVideo={this.addVideo} allVideos={this.state.allVideos}/>

                    <div className={"allVideos"}>
                        {this.state.allVideos.map((video, index) =>
                            <VideoCard
                                deleteVideoWeb={this.deleteVideoWeb}
                                video={video}
                                key={video.name}
                                loading={this.state.loadings[index]}
                                setCollections={this.setCollections}

                            />
                        )}
                        {this.state.allVideos.length === 0 &&
                        <div className={'noVideosDiv'}>Upload at last one video.</div>}
                    </div>
                    {this.state.allVideos.length > 0 &&
                    <div className={'bottomDivSlidesVideo'}>
                        {this.state.allVideos.length > 2 &&<div className={'dragPicDiv'}><img alt ='...' src={'images/dragPic.png'}/></div>}
                        {this.state.allVideos.length} total videos
                        {this.state.allVideos.length > 2 &&<div className={'dragPicDiv'}><img alt ='...' src={'images/dragPic.png'}/></div>}

                    </div>
                    }

                    <Link to={'/addNewResources'}>
                        <div className={'backArrowDiv'}>
                            <BsArrowReturnLeft/>
                        </div>
                    </Link>
                    <div className={'onVideoDiv'}>
                        <img className={'onVideo'} src={'images/videos2.png'} alt={'...'}/>
                    </div>
                    <Link to={'/foldersInterface'}>
                        <div className={'goFolderImage'}>
                            <img className={''} src={'images/image2t.png'} alt={'...'}/>
                        </div>
                    </Link>
                </div>
            </>
        );
    }


}


export default InputVideos;
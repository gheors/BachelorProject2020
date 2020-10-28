import React, {useState} from "react";
import ReactPlayer from "react-player";
import Slider from "rc-slider";
import {Button} from "../button/Button";
import {HashLoader} from "react-spinners";
import {css} from "@emotion/core";
import './VideoCard.css'

function VideoCard(props) {
    const video = props.video;
    const [frameRate, setFrameRate] = useState(1)
    const [loading, setLoading] = useState(props.loading)
    const override = css`
        display: in-block;
        `;

    const runFragmentation = () => {
        setLoading(true)
        fetch(`/api/videos/${video.name}?frameRate=${frameRate}`)
            .then(res => res.json()).then(() => {
            setLoading(false)
        })
    }
    return <div className='wrapperVideoCard'>
        <ReactPlayer className='reactPlayer' controls url={`/videos/${video.name}`}/>
        <Slider value={frameRate} onChange={(value => setFrameRate(value))} min={1} max={24}
                className={"slider_videos"}/>
        {frameRate}
        <Button buttonStyle="button-outline" buttonSize='button-large'
                onClick={runFragmentation}>
            start fragmentation <HashLoader css={override} loading={loading}
                                            size={25} color={"#ccff00"}/>
        </Button>

    </div>;
}

export default VideoCard;
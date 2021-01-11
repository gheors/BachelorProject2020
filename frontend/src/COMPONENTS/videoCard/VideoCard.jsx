import React, {useEffect, useState} from "react";
import ReactPlayer from "react-player";
import Slider from "rc-slider";
import {Button} from "../button/Button";
import {HashLoader} from "react-spinners";
import {css} from "@emotion/core";
import './VideoCard.css'
import Checkbox from '@material-ui/core/Checkbox';
import Axios from "axios";
import {BiMerge} from "react-icons/bi";
import {HiPencilAlt} from "react-icons/hi";


function VideoCard(props) {
    const video = props.video;
    const [fragmented, setFragmented] = useState(video.fragmented);
    const [frameRate, setFrameRate] = useState(1)
    const [loading, setLoading] = useState(props.loading)
    const [preDelete, setPreDelete] = useState(false);
    const duration = video.duration;
    const totalImages = duration * frameRate;
    const [mounted, setMounted] = useState(true)

    const override = css`
        display: in-block;
        `;

    useEffect(() => {
        return setMounted(false);
    },[])


    const runFragmentation = () => {
        setLoading(true)
        Axios.get(`/api/videos/${video.name}?frameRate=${frameRate}`)
            .then(res => {
                console.log(res)
                props.setCollections(res.data)
            })
            .then(() => {
                if(mounted){
                    setFragmented(true)
                    setLoading(false)
                    if (preDelete) {
                        deleteVideo()
                    }

                }

        })
    }

    const deleteVideo = () => {
        props.deleteVideoWeb(video)
        Axios.delete(`http://localhost:3000/api/videos/?name=${video.name}`, video)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    const deleteAfterFrag = () => {
        preDelete ? setPreDelete(false) : setPreDelete(true)
    }


    return (
        <div className='VideoCard'>
            <div className={'leftVideoCard'}>
                <ReactPlayer className='reactPlayer' controls url={`/videos/${video.name}`}/>
            </div>
            <div className={'rightVideoCard'}>
                <div className={'ads'}>AiTiA <i className="fas adsIcon fa-crop-alt"/></div>
                <div className={'titleVideoCard'}>{video.name.split('.')[0]} <HiPencilAlt
                    onClick={console.log('clicked')}/></div>
                <div className={'sliderWrapper'}>
                    <div className={'ChooseDiv'}>Frame Rate setter <BiMerge/></div>
                    <div className={'sliderDiv'}>
                        <Slider value={frameRate}
                                onChange={(value => setFrameRate(value))} min={1} max={8}
                                className={"slider_videos"}/>
                    </div>

                    <div className="ff_parent">
                        <div className={'fps'}> {'fps: ' + frameRate}</div>
                        <div className={'frames'}>{'frames out: ' + totalImages}</div>
                    </div>
                </div>

                <div className='delete'>
                    delete after extraction
                    <Checkbox checked={preDelete}
                              onChange={deleteAfterFrag}
                              className={'checkbox'}
                    />
                </div>

                <div className={'videoCardButtonsDiv'}>
                    <Button className={'buttonDelete'} buttonStyle="button-outline-secondary" buttonSize='button-medium'
                            onClick={deleteVideo}>
                        Delete Video
                    </Button>
                    <Button className={'buttonFragment'}
                            buttonStyle={!fragmented ? "button-outline" : "button-outline-disabled"}
                            buttonSize='button-medium'
                            onClick={fragmented || loading ? null : runFragmentation}>
                        {<div
                            className={loading ? 'loadingClassActive' : 'loadingClass'}>{loading ?
                            <HashLoader css={override} loading={loading}
                                        size={17} color={"#ccff00"}/> : "extract frames"}</div>}

                    </Button>

                </div>
            </div>
        </div>
    );
}

export default VideoCard;
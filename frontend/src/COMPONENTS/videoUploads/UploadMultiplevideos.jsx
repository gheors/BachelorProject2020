import React, {useState} from "react";
import "./UploadMultiplevideos.css";
import {Button} from "../button/Button";
import {Link} from 'react-router-dom'
import Axios from "axios";
import {MdVideoLibrary} from "react-icons/md";

function UploadMultipleVideos(props) {
    const fileObj = [];
    const previewArray = [];
    const filesArr = []
    const namesArr = []
    const ex = []
    const existingNames = props.allVideos.map(video => {
        return video.name
    })
    // hooks
    const [previewFiles, setPreviewFiles] = useState([]);
    const [preview, setPreview] = useState(false);
    let [files, setFiles] = useState([])
    let [names, setNames] = useState([])
    let [existing, setExisting] = useState([])

    const previewMultipleFiles = event => {
        fileObj.push(event.target.files);
        // just for display

        for (let i = 0; i < fileObj[0].length; i++) {
            let file = fileObj[0][i];

            if (existingNames.includes(file.name)) {
                console.log(file.name + " already exists!!")
                ex.push(file.name)

            } else {
                filesArr.push(file)
                namesArr.push(file.name)
                previewArray.push(URL.createObjectURL(file));
            }

        }
        // need to display a small video preview
        setPreviewFiles(previewArray);
        setPreview(true);
        setFiles(filesArr);
        setNames(namesArr)
        setExisting(ex)
    }
    const resetPreview = () => {
        setPreviewFiles([])
        setPreview(false)
        document.getElementById('InputUploadVideos').value = null

    }


    const uploadVideos = () => {
        const data = new FormData();

        files.forEach(file => {
            if (file !== null)
                data.append('file', file)
        })
        names.forEach(name => {
            if (name !== null)
                data.append('names', name)
        })
        Axios.post("http://localhost:3000/api/videos", data)
            .then(res => {
                props.addVideo(res.data)
            })
            .catch(err => console.log(err));
        resetPreview()
    }

    return (
        <div className="upload_form">
            <div className="upload_body">
                <form action="#">

                    {preview && previewFiles.length > 0 && <div className="upload_header">Preview</div>}

                    {preview && previewFiles.length > 0 && <div className={'innerPreviewWrapper'}>
                        {(previewFiles || []).map((url,index) => (
                            <div key={url} className={'innerVideo'}>
                                <video src={url}/>
                                <MdVideoLibrary className={'videoIconPrev'}/>
                            </div>
                        ))}
                    </div>}
                    <div className='inline'>
                        <input
                            id={'InputUploadVideos'}
                            placeholder={'Choose video to Build Collection'}
                            type="file"
                            className={
                                !preview ? 'form-control' : 'form-control-adjust'
                            }
                            onChange={previewMultipleFiles}
                            accept='video/*'
                            multiple
                        />
                        {preview && existing.length > 0 && <div className={'existing_namesDiv'}>
                            already existing:
                            {existing.map(name=>{
                                return <div key={name + '_exist'}>
                                    {'' +name}
                                </div>
                            })}
                        </div>}
                        {preview && previewFiles.length > 0 &&  <div className="button_upload">
                            <Link to='./videosInterface'>
                                <Button
                                    className={'clause'}
                                    buttonStyle="button-outline"
                                    buttonSize="button-full"
                                    onClick={uploadVideos}
                                    type='submit'

                                >
                                    Upload <i className="fas fa-upload"/>
                                </Button>
                            </Link>
                        </div>}
                    </div>
                </form>
            </div>
        </div>
    )
}


export default UploadMultipleVideos;


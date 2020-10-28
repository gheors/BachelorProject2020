import React, {useState} from "react";
import "./UploadMultiplevideos.css";
import {Button} from "../button/Button";
import {Link} from 'react-router-dom'
import Axios from "axios";




function UploadMultipleVideos(props) {

    const fileObj = [];
    const fileArray = [];
    // hooks
    const [previewFiles, setPreviewFiles] = useState([]);
    const [preview, setPreview] = useState(false);
    const [file, setFile] = useState();
    const [name, setName] = useState();


    const uploadMultipleFiles = event => {
        fileObj.push(event.target.files);

        // just for display
        for (let i = 0; i < fileObj[0].length; i++) {
            console.log(fileObj[0][i])
        }

        // need to display a small video preview
        for (let i = 0; i < fileObj[0].length; i++) {
            fileArray.push(URL.createObjectURL(fileObj[0][i]));
        }

        const file = event.target.files[0];
        const name = event.target.files[0].name;
        setFile(file);
        setName(name);
        setPreviewFiles(fileArray);
        setPreview(true);

    }
    const resetPreview = () => {
        setPreviewFiles([])
        setPreview(false)

    }


    const uploadVideos = () => {
        // event.preventDefault();
        // console.log(file)
        const data = new FormData();
        data.append('name', name)
        data.append('file', file);
        Axios.post("http://localhost:3000/api/videos", data)
            .then(res => props.addVideo(res.data))
            .catch(err => console.log(err));
        resetPreview()
    }

    return (
        <div className="upload_form">
            <div className="upload_body">
                <form action="#">

                    <div className='inline'>
                        <input
                            type="file"
                            className="form-control"
                            onChange={uploadMultipleFiles}
                            accept='video/*'
                            // multiple
                        />
                        <div className="button_upload">
                            <Link to='./allVideos'>
                                <Button
                                    className='clause'
                                    buttonStyle="button-primary"
                                    buttonSize="button-full"
                                    onClick={uploadVideos}
                                    type='submit'
                                >
                                    Upload <i className="fas fa-upload"/>
                                </Button>
                            </Link>
                        </div>
                    </div>
                    {preview && <div className="upload_header">Preview of videos to upload</div>}

                    <div className="form-group multi-preview">
                        {(previewFiles || []).map((url) => (
                            <video key={url} src={url}/>
                        ))}
                    </div>
                </form>
            </div>
        </div>
    )
}


export default UploadMultipleVideos


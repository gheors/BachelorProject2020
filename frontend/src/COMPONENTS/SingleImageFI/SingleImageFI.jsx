import React, {useEffect, useState} from "react";

import "./SingleImageFI.css";

import Checkbox from '@material-ui/core/Checkbox';

function SingleImageFI(props) {

    const [deleteImage, setDeleteImage] = useState(false)

    const deleteImageFromCollection = () => {
        deleteImage ? setDeleteImage(false) : setDeleteImage(true)

        if (!deleteImage) {
            props.setCounter(props.counter + 1)
            props.imagesDelete.push(props.image._id)

        } else {
            if (props.imagesDelete.includes(props.image.name)) {
                let index = props.imagesDelete.indexOf(props.image.name)
                props.imagesDelete.splice(index, 1)
            }

            props.setCounter(props.counter - 1)
        }
        console.log(props.imagesDelete)
    }
    return (
        <>
            <div key={props.image._id} style={{position: 'relative'}}>
                <div style={props.flagDelete ? {display: 'unset'} : {display: 'none'}}
                     className={'checkDelete'}>
                    <Checkbox className={'checkBoxDelete'} checked={deleteImage}
                              onClick={() => deleteImageFromCollection()}/>
                </div>
                <img src={`./frames/${props.folder}/${props.image.name}`} alt={"..."}/>
                <div className={'counterImageFolder'}>{props.index + 1}</div>
            </div>
        </>
    );
}

export default SingleImageFI;

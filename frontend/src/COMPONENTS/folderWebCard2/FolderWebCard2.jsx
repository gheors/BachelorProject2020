import React from "react";
import "./FolderWebCard2.css";

function FolderWebCard2(props) {
    const {folder,index,setCurrentFolderZero} = props;
    return (
        <>
            <div  onClick={()=>setCurrentFolderZero(folder)}  className={"collectionCardDiv"}>
                <img
                    className={"imageCoverCollection"}
                    src={`/frames/${folder.name}/${folder.cover}`}
                    alt="..."
                />
                <div className={"titleFolderCardCollection"}>
                    {folder.name}
                </div>
                <div className={"numberOfCollectionDiv"}>
                    {index+1}
                </div>
                <div className={"totalImagesCollectionDiv"}>
                    total Images: <div className={'totalImagesCollectionDivNumber'}>{folder.totalImages}</div>
                </div>

            </div>

        </>
    );
}

export default FolderWebCard2;

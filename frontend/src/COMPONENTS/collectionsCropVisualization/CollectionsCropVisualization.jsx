import React, {useEffect, useState} from "react";
import "./CollectionsCropVisualization.css";
import "../../COMPONENTS/buttonCard/ButtonCardMenu.css";
import Axios from "axios";
import FolderWebCard2 from "../../COMPONENTS/folderWebCard2/FolderWebCard2";

export default function CollectionsCropVisualization(props) {
    const [allFolders, setAllFolders] = useState([])

    useEffect(() => {
        Axios.get("/api/folders").then((data) => {
            setAllFolders(data.data)
        });

    }, []);

    return (
        <>
                <div className={'totFoldersCropDiv'}>Total collections in the gallery:
                    <div className='numberLengthCrop'>{allFolders.length}</div>
                </div>
                <div className={"foldersContainer2"}>
                    {allFolders.map((folder, index) => (
                        <FolderWebCard2
                            folder={folder}
                            key={index}
                            index={index}
                            setCurrentFolderZero={props.setCurrentFolderZero}
                        />
                    ))}
                </div>
        </>
    );
}

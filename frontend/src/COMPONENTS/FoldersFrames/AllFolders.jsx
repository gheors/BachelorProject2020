import React  from "react";
import "./AllFolders.css";
import "../../App.css";
import FolderWebCard from "../folderWebCard/FolderWebCard";

function AllFolders(props) {
  return (
    <>
      {
        <div className={"foldersContainer"}>
          {props.folders.map((folder, index) => (
            <FolderWebCard
              deleteFolder={props.deleteFolder}
              currentFolder={props.currentFolder}
              setCurrentFolder={props.setCurrentFolder}
              folder={folder}
              key={index}
            />
          ))}
        </div>
      }
    </>
  );
}

export default AllFolders;

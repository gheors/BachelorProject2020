import React from "react";
import "./FolderWebCard.css";
import * as MdIcons from "react-icons/md";
import {FaPen} from "react-icons/fa";
import {Tooltip} from "@material-ui/core";

function FolderWebCard(props) {
  const { folder, setCurrentFolder, deleteFolder, currentFolder } = props;
  const isActive = currentFolder === folder.name;
  return (
    <>
      <div
        className="FolderCard"
        onClick={() => {
          setCurrentFolder(folder);
        }}
        style={{
          boxShadow: isActive ? '0 0 2px 2px #ffc109' : '0 0 2px 2px #212121',
        }}
      >
        <div className={"leftCard"}>
          <img
            className={"imageCover"}
            src={`/frames/${folder.name}/${folder.cover}`}
            alt="..."
          />
          <div className={"titleFolderCard"}>
            <span>{folder.name}</span>
          </div>
        </div>
        <div className={"folderCardIconsDiv"}>
          <Tooltip title={"Rename"} placement={'left'}>
            <div className={"folderCardIcon"}>
              <FaPen />
            </div>
          </Tooltip>
          <Tooltip title={"delete Collection"} placement={'left-start'}>
          <div
            className={"folderCardIconDelete"}
            onClick={() => deleteFolder(folder)}
          >
            <MdIcons.MdRemoveCircle />
          </div>
          </Tooltip>

        </div>
      </div>
    </>
  );
}

export default FolderWebCard;

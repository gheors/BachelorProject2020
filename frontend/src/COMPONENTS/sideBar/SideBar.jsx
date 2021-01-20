import React, {useRef, useState} from "react";
import {FaFolderPlus} from "react-icons/fa";
import "./SideBar.css";
import AllFolders from "../FoldersFrames/AllFolders";
import {BsFillCollectionPlayFill} from "react-icons/bs";
import InputComponent from "../inputComponent/InputComponent";
import Axios from "axios";
import MyAccordion from "../accordionComponent/AccordionComponent";

function SideBar(props) {
    let folders = props.allFolders;
    const [valueName, setValueName] = useState("");
    const inputLeft = useRef(null)

    const updateStateValueFromInput = (value) => {
        setValueName(value);
    };

    const body = () => {
        return (
            <div className={"UploadElementsDiv step_2_Folders"}>
                <InputComponent
                    label={"Add new collection"}
                    placeholder={"type name here..."}
                    name={"newName"}
                    updateStateValueFromInput={updateStateValueFromInput}
                />
                <input
                    placeholder={"Choose video to Build Collection"}
                    type="file"
                    style={{display: 'none'}}
                    className={"uploadImageDiv"}
                    onChange={(event) => {
                        props.selectImagesToUpload(event, valueName, 'addFolder')
                    }}
                    accept="image/*"
                    ref={inputLeft}
                    multiple
                />

                {valueName !== '' && <div className={"buttonWrapperLeft"}>
                    <div className={"divIconRight"} onClick={() => inputLeft.current?.click()}>
                        <i className="fas fa-upload"/>
                    </div>
                </div>}
            </div>
        );
    };

    return (
        <>
            <div className={"sideBarContainer step_1_Folders"}>
                        <div className="navbar-toggle">
                            Collections{" "}
                            <div className={"iconWrapper"}>
                                <BsFillCollectionPlayFill/>
                            </div>
                        </div>
                        {folders.length > 0 &&
                        <>
                            <AllFolders
                                folders={folders}
                                currentFolder={props.currentFolder}
                                deleteFolder={props.deleteFolder}
                                setCurrentFolder={props.setCurrentFolder}
                            />

                            <div>
                                <div className={"totalCollectionsDivInfo"}>
                                    Total Collections: {folders.length}
                                </div>
                            </div>
                        </>
                        }
                        {body()}
            </div>
        </>
    );
}

export default SideBar;

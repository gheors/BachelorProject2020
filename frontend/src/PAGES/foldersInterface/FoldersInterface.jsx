import React, {Component, useContext, useEffect, useState} from "react";
import SideBar from "../../COMPONENTS/sideBar/SideBar";
import "./FoldersInterface.css";
import SlideShowSwiper from "../../COMPONENTS/slideShow/SlideShow";
import ParticlesBackground from "../../COMPONENTS/particels/ParticelsBackground";
import {Link} from "react-router-dom";
import RightBar from "../../COMPONENTS/RightBar/RightBar";
import TutorialComponent from "../../COMPONENTS/tutorialComponent/TutorialComponent";
import {tutorialSteps} from "./tutorialStepsFoldersInterface";
import {Context} from "../../Context";
import {
    deleteFolderAPI,
    deleteSelectedImages_API,
    getExistingFolders,
    getSelectedFolder,
    selectImagesUpload_API
} from "../inputVideos/ResourcesServices";


export default function FoldersInterface(props) {

    const {folders, setFolders} = useContext(Context)
    const [currentImages, setCurrentImages] = useState([])
    const [currentFolder, setCurrentFolder] = useState([])
    const [currentFolderID, setCurrentFolderID] = useState(undefined)
    const [currentImage, setCurrentImage] = useState([])
    const [isTour, setIsTour] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const foldersDB = await getExistingFolders()
            setFolders(foldersDB);
            if (foldersDB.length > 0) {
                console.log(foldersDB[0])
                visualizeCurrentFolder(foldersDB[0]);
            }
        };
        fetchData().then(() => console.log(folders))
    }, []);

    useEffect(() => {
        addFolder(props.collections);
        visualizeCurrentFolder(props.collections)
    }, [props.collections]);


    const addFolder = (folder) => {
        setFolders([folder, ...folders])
    };

    const deleteFolder = async (folder) => {
        await deleteFolderAPI(folder)
        setFolders(folders.filter(element => element !== folder))

        if (folders.length > 0) {
            await visualizeCurrentFolder(folders[0])
        }
    };


    const deleteSelectedImages = async (deleteArr) => {
        await deleteSelectedImages_API(currentFolderID, deleteArr)
            .then((res) => {
                setCurrentImages(res.data)
                props.setImagesArray(res.data)
                if (res.data.length === 0) {
                    let newFolders = folders;
                    let index = newFolders.indexOf(currentFolder);
                    newFolders.splice(index, 1);
                    setFolders(newFolders)
                }
            })
            .catch((err) => console.log(err));
    };

    const visualizeCurrentFolder = async (folder) => {
        await getSelectedFolder(folder._id).then(res => {
            setCurrentFolder(folder.name)
            setCurrentImages(res.data)
            setCurrentFolderID(folder._id)
            props.setCurrentFolder(folder.name);
            props.setImagesArray(res.data);
        }).catch(err => console.log(err))
    };

    const selectImagesToUpload = async (event, valueName, apiPath) => {
        const data = new FormData();
        const images = [];
        for (let i = 0; i < event.target.files.length; i++) {
            images.push(event.target.files[i]);
        }
        console.log(images)

        images.forEach((image) => {
            data.append("file", image);
            data.append("names", image.name);
        });

        await selectImagesUpload_API(apiPath, valueName, data)
            .then((res) => {
                if (apiPath === "addFolder") {
                    addFolder(res.data);
                    setCurrentFolder(folders[0].name)
                    // console.log(res.data)
                } else {
                    setCurrentImages(res.data)
                    props.setImagesArray(res.data)
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <ParticlesBackground/>
            <TutorialComponent setIsTourOpen={setIsTour} isTourOpen={isTour}
                               tutorialSteps={tutorialSteps}/>
            <div className={"PageContainer"}>
                <div style={{display: "flex", height: "fit-content"}}>
                    <SideBar
                        allFolders={folders}
                        deleteFolder={deleteFolder}
                        setCurrentFolder={visualizeCurrentFolder}
                        currentFolder={currentFolder}
                        selectImagesToUpload={selectImagesToUpload}
                    />

                    <div className={"containerMainFull"}>
                        <div className={"allSwiperSlides step_3_Folders"}>
                            <SlideShowSwiper
                                folderToDisplay={currentFolder}
                                images={currentImages}
                                currentImage={currentImage}
                            />
                        </div>
                    </div>
                    <RightBar
                        images={currentImages}
                        folder={currentFolder}
                        setCurrentImage={setCurrentImage}
                        selectImagesToUpload={selectImagesToUpload}
                        deleteSelectedImages={deleteSelectedImages}
                    />
                </div>

                <div className={'buttonTutorialDiv  posTutorial'} onClick={() => setIsTour(!isTour)}>
                    Tutorial
                </div>
                <Link to={'/addNewResources'}>
                    <div className={'backArrowDiv adjustPosBack'}>
                        <i className="fas fa-long-arrow-alt-left"/>
                    </div>
                </Link>
            </div>
        </div>
    );
}

import React, {Component} from "react";
import SideBar from "../../COMPONENTS/sideBar/SideBar";
import "./FoldersInterface.css";
import SlideShowSwiper from "../../COMPONENTS/slideShow/SlideShow";
import Axios from "axios";
import ParticlesBackground from "../../COMPONENTS/particels/ParticelsBackground";
import {Link} from "react-router-dom";
import RightBar from "../../COMPONENTS/RightBar/RightBar";
import TutorialComponent from "../../COMPONENTS/tutorialComponent/TutorialComponent";
import {tutorialSteps} from "./tutorialStepsFoldersInterface";

class FoldersInterface extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allFolders: [],
            currentImages: [],
            currentFolder: "",
            currentFolderId: "",
            currentImage: null,
            isTourOpen: false
        };
    }

    componentDidMount() {
        Axios.get("/api/folders").then((data) => {
            this.setState({
                allFolders: data.data,
            });
            if (data.data.length > 0) {
                this.setCurrentFolder(data.data[0]);
            }
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.collections !== this.props.collections) {
            console.log(this.props.collections);
            if (this.props.collections) {
                this.addFolder(this.props.collections);
                this.setCurrentFolder(this.props.collections)
            }
        }
    }

    deleteFolder = (folder) => {
        console.log(folder);
        Axios.delete(
            `http://localhost:3000/api/folders/?id=${folder._id}&name=${folder.name}&videoName=${folder.videoName}`,
            folder
        )
            .then((res) => {
                console.log(res);
                let newFolders = this.state.allFolders;
                let index = newFolders.indexOf(folder);
                newFolders.splice(index, 1);
                this.setState({
                    allFolders: newFolders,
                });
                if (this.state.allFolders.length > 0) {
                    this.setCurrentFolder(this.state.allFolders[0]);
                }
            })
            .catch((err) => console.log(err));
    };

    deleteSelectedImages = (deleteArr) => {
        Axios.post(
            `http://localhost:3000/api/images/folder/${this.state.currentFolderId}`,
            deleteArr
        )
            .then((res) => {
                this.setState({
                    currentImages: res.data,
                });
                this.props.setImagesArray(res.data);
                if(res.data.length === 0){
                    let newFolders = this.state.allFolders;
                    let index = newFolders.indexOf(this.state.currentFolder);
                    newFolders.splice(index, 1);
                    this.setState({
                        allFolders: newFolders,
                    });
                }
            })
            .catch((err) => console.log(err));
    };

    addFolder = (folder) => {
        this.setState({
            allFolders: [...this.state.allFolders, folder],
        });
    };

    setCurrentFolder = (folder) => {
        Axios.get(`http://localhost:3000/api/images/folder/${folder._id}`)
            .then((res) => {
                this.setState({
                    currentFolder: folder.name,
                    currentFolderId: folder._id,
                    currentImages: res.data,
                });
                this.props.setCurrentFolder(folder.name);
                this.props.setImagesArray(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    selectImagesToUpload = (event, valueName, apiPath) => {
        const data = new FormData();
        const images = [];
        for (let i = 0; i < event.target.files.length; i++) {
            images.push(event.target.files[i]);
        }
        images.forEach((image) => {
            data.append("file", image);
            data.append("names", image.name);
        });
        Axios.post(
            `http://localhost:3000/api/folders/${apiPath}/${valueName}`,
            data
        )
            .then((res) => {
                if (apiPath === "addFolder") {
                    this.addFolder(res.data);
                    // console.log(res.data)
                } else {
                    this.setState({currentImages: res.data});
                    this.props.setImagesArray(res.data);
                }
            })
            .catch((err) => console.log(err));
    };

    setCurrentImage = (image) => {
        this.setState({
            currentImage: image._id,
        });
    };
    setIsTourOpen = (value) => {
        this.setState({
            isTourOpen: value
        })
    }


    render() {
        return (
            <div>
                <ParticlesBackground/>
                <TutorialComponent setIsTourOpen={this.setIsTourOpen} isTourOpen={this.state.isTourOpen}
                                   tutorialSteps={tutorialSteps}/>
                <div className={"PageContainer"}>
                    <div style={{display: "flex", height: "fit-content"}}>
                        <SideBar
                            allFolders={this.state.allFolders}
                            deleteFolder={this.deleteFolder}
                            setCurrentFolder={this.setCurrentFolder}
                            currentFolder={this.state.currentFolder}
                            selectImagesToUpload={this.selectImagesToUpload}
                        />

                        <div className={"containerMainFull"}>
                            <div className={"allSwiperSlides step_3_Folders"}>
                                <SlideShowSwiper
                                    folderToDisplay={this.state.currentFolder}
                                    images={this.state.currentImages}
                                    currentImage={this.state.currentImage}
                                />
                            </div>
                        </div>
                        <RightBar
                            images={this.state.currentImages}
                            folder={this.state.currentFolder}
                            setCurrentImage={this.setCurrentImage}
                            selectImagesToUpload={this.selectImagesToUpload}
                            deleteSelectedImages={this.deleteSelectedImages}
                        />
                    </div>

                    <div  className={'buttonTutorialDiv  posTutorial'} onClick={() => this.setIsTourOpen(true)}>
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
}

export default FoldersInterface;

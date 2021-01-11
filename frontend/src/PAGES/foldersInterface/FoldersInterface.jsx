import React, { Component } from "react";
import SideBar from "../../COMPONENTS/sideBar/SideBar";
import "./FoldersInterface.css";
import SlideShowSwiper from "../../COMPONENTS/slideShow/SlideShow";
import Axios from "axios";
import ParticlesBackground from "../../COMPONENTS/particels/ParticelsBackground";
import { Link } from "react-router-dom";
import RightBar from "../../COMPONENTS/RightBar/RightBar";

class FoldersInterface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allFolders: [],
      currentImages: [],
      currentFolder: "",
      currentFolderId: "",
      currentImage: null,
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
      if (this.props.collections) this.addFolder(this.props.collections);
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
          this.setState({ currentImages: res.data });
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

  render() {
    return (
      <div>
        <ParticlesBackground />
        <div className={"PageContainer"}>
          <div style={{ display: "flex", height: "fit-content" }}>
            <SideBar
              allFolders={this.state.allFolders}
              deleteFolder={this.deleteFolder}
              setCurrentFolder={this.setCurrentFolder}
              currentFolder={this.state.currentFolder}
              selectImagesToUpload={this.selectImagesToUpload}
            />

            <div className={"containerMainFull"}>
              <div className={"allSwiperSlides"}>
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

          <div className={"bottomBarDiv"}>
            {/*<Link to={"/addNewResources"}>*/}
            {/*  <div className={"backArrowDiv"}>*/}
            {/*    <img*/}
            {/*      className={"backArrow"}*/}
            {/*      src={"images/arrow.png"}*/}
            {/*      alt={"..."}*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*</Link>*/}
            {/*<Link to={"/videosInterface"}>*/}
            {/*  <div className={"goToVideosDiv"}>*/}
            {/*    <img*/}
            {/*        className={"goToVideos"}*/}
            {/*        src={"images/videos2.png"}*/}
            {/*        alt={"..."}*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*</Link>*/}
            {/*<div className={"onVideoDiv"}>*/}
            {/*  <img*/}
            {/*    className={"onCollection"}*/}
            {/*    src={"images/image2t.png"}*/}
            {/*    alt={"..."}*/}
            {/*  />*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    );
  }
}

export default FoldersInterface;

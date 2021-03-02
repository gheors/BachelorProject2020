import React, {useState} from "react";
import Navbar from "./COMPONENTS/navbar/Navbar";
import "./App.css";
import WelcomePage from "./PAGES/welcomePage/welcomePage";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {useLocation} from "react-router";
import FoldersInterface from "./PAGES/foldersInterface/FoldersInterface";
import InputVideos from "./PAGES/inputVideos/InputVideos";
import AddNewResources from "./PAGES/addNewResources/AddNewResources";
import CropMainPage from "./PAGES/cropMainPage/CropMainPage";
import HomePage from "./PAGES/homePage/HomePage";
import {ColorPickerComponent} from "./COMPONENTS/colorPicker/ColorPickerComponent.scss";
import {Context} from './Context'

function App() {
    const [videos, setVideos] = useState([])
    const [folders, setFolders] = useState([])
    const [currentFolder, setCurrentFolder] = useState(undefined);
    const [currentImages, setCurrentImages] = useState([]);

    return (
        <Context.Provider value={
            {
                videos,
                setVideos,
                folders,
                setFolders,
                currentFolder,
                setCurrentFolder,
                currentImages,
                setCurrentImages
            }}>

            <Router>
                <Switch>
                    <Route path="/" exact component={WelcomePage}/>
                    <Route>
                        <WithNavBar/>
                    </Route>
                </Switch>
            </Router>

        </Context.Provider>
    );
}

function WithNavBar() {
    const {pathname} = useLocation();
    const [currentFolder, setCurrentFolder] = useState(undefined);
    const [imagesArray, setImagesArray] = useState([]);
    const [collections, setCollections] = useState([]);
    return (
        <div style={{display: "flex", flexDirection: "column", height: "100%"}}>
            <Navbar/>
            {pathname === "/dataset" && <HomePage/>}
            {pathname === "/videosInterface" && (
                <InputVideos
                    collections={collections}
                    setCollections={setCollections}
                />
            )}
            {pathname === "/foldersInterface" && (
                <FoldersInterface
                    setCurrentFolder={setCurrentFolder}
                    setImagesArray={setImagesArray}
                    collections={collections}
                />
            )}
            {pathname === "/page3" && <ColorPickerComponent/>}
            {pathname === "/addNewResources" && <AddNewResources/>}
            {pathname === "/cropMainPage" && (
                <CropMainPage
                    setCurrentFolder={setCurrentFolder}
                    setImagesArray={setImagesArray}
                    currentFolder={currentFolder}
                    imagesArray={imagesArray}
                />
            )}
        </div>
    );
}

export default App;

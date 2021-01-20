import React, { useState } from "react";
import Navbar from "./COMPONENTS/navbar/Navbar";
import "./App.css";
import WelcomePage from "./PAGES/welcomePage/welcomePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useLocation } from "react-router";
import c from "./PAGES/homePage/HomePage";
import FoldersInterface from "./PAGES/foldersInterface/FoldersInterface";
import InputVideos from "./PAGES/inputVideos/InputVideos";
import AddNewResources from "./PAGES/addNewResources/AddNewResources";
import CropMainPage from "./PAGES/cropMainPage/CropMainPage";
import CroppedSample from "./COMPONENTS/croppperSample/CropperSample";
import HomePage from "./PAGES/homePage/HomePage";
import { AnimatedBulb } from "./COMPONENTS/animatedBulb/AnimatedBulb";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={WelcomePage} />
        <Route>
          <WithNavBar />
        </Route>
      </Switch>
    </Router>
  );
}

function WithNavBar() {
  const { pathname } = useLocation();
  const [currentFolder, setCurrentFolder] = useState(undefined);
  const [imagesArray, setImagesArray] = useState([]);
  const [collections, setCollections] = useState([]);
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Navbar />
      {pathname === "/dataset" && <HomePage />}
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
      {pathname === "/page3" && <AnimatedBulb />}
      {pathname === "/addNewResources" && <AddNewResources />}
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

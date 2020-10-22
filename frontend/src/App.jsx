import React, {useEffect, useState} from "react";
import Navbar from "./components/navbar/Navbar";
import "./App.css";
import Home from "./components/pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DataSet from "./components/pages/datasetPage/Dataset";
import Page3 from "./components/pages/Page3";
import SignUp from "./components/pages/SignUp";
import AllVideos from "./components/pages/allvideos/AllVideos";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [res, setRes] = useState(undefined)
  const [data, setData] = useState(undefined)

  useEffect(() => {
    fetch('/videos').then(res => res.json()).then(setData)
  },[])

  useEffect(() => {
    console.log(res,data)
  }, [res,data])
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/dataset" component={DataSet} exact />
          <Route path="/dataset/allVideos" component={AllVideos} />
          <Route path="/page3" component={Page3} />
          <Route path="/sign-up" component={SignUp} />
        </Switch>
      </Router>
    </>
  );
}

export default App;

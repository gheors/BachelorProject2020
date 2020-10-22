import React from "react";
import "../../App.css";
import { Button } from "../button/Button";
import "./HeroSection.css";
import Popup from "../popUp/PopUp";




function HeroSection() {


  return (
    <div className="hero-container">
      <h1>ARTIFICIAL ADVENTURE</h1>
      <p>Are you still waiting for?</p>
      <div className="hero-buttons">
        <Button
          className=""
          buttonStyle="button-outline"
          buttonSize="button-large"
        >
          GET STARTED
        </Button>
        <Popup children="WATCH TRAILER" buttonStyle="button-primary" buttonSize="button-large" />
      </div>
    </div>
  );
}

export default HeroSection;
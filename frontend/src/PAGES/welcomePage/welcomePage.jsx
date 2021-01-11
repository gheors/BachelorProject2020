import React from "react";
import "../../App.css";
import Welcome from "../../COMPONENTS/welcome/Welcome";
import Footer from "../../COMPONENTS/footer/Footer";

function WelcomePage() {
  return (
    <>
      <video  className="video_background" src="/videos/video-2.mp4" autoPlay loop muted />
      <Welcome />
      <Footer />
    </>
  );
}

export default WelcomePage;

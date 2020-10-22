import React from "react";
import "../../App.css";
import Cards from "../cards/Cards";
import HeroSection from "../herosection/HeroSection";
import Footer from "../footer/Footer";

function Home() {
  return (
    <>
      <video  className="video_background" src="/videos/video-2.mp4" autoPlay loop muted />
      <HeroSection />
      <Cards />
      <Footer />
    </>
  );
}

export default Home;

import React from "react";
import "../App.css";
import Cards from "../components/cardsHome/Cards";
import HomeMain from "../components/homeMain/HomeMain";
import Footer from "../components/footer/Footer";

function Home() {
  return (
    <>
      <video  className="video_background" src="/videos/video-2.mp4" autoPlay loop muted />
      <HomeMain />
      <Cards />
      <Footer />
    </>
  );
}

export default Home;

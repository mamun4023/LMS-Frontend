import React from "react";
import Banner from "./banner";
import Events from "./events";
import Gallery from "./gallery";
import Playstore from "./playstore";

const Home = () => {
  return (
    <>
      <Banner />
      <Playstore />
      <Events />
      <Gallery />
    </>
  );
};

export default Home;

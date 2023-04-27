import React, { useContext } from "react";
import SliderContex from "../utils/SliderContext";
import BodyMainConatiner from "./BodyMainConatiner";
import SideBarSlider from "./SideBarSlider";
import VideoPlayer from "./VideoPlayer";

const Body = () => {
  const { slider } = useContext(SliderContex);
  return (
    <div className="flex">
      {slider && <SideBarSlider />}
      <BodyMainConatiner />
      <VideoPlayer />
    </div>
  );
};

export default Body;

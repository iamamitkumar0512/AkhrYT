import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import SliderContex from "../utils/SliderContext";
import SideBarSlider from "./SideBarSlider";

const Body = () => {
  const { slider } = useContext(SliderContex);
  return (
    <div className="flex">
      {slider && <SideBarSlider />}
      <Outlet />
    </div>
  );
};

export default Body;

import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import SliderContex from "../utils/SliderContext";
import SideBarSlider from "./SideBarSlider";
import Header from "./Header";
import Prompt from "./Prompt";

const Body = () => {
  const { slider } = useContext(SliderContex);

  return (
    <>
      <Header />
      <Prompt />
      <div className="flex">
        {slider && <SideBarSlider />}
        <Outlet />
      </div>
    </>
  );
};

export default Body;

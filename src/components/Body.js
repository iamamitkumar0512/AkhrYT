import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import SliderContex from "../utils/SliderContext";
import Header from "./Header";
import SideBarSlider from "./SideBarSlider";
import { commentData } from "../utils/commentData";

const Body = () => {
  const { slider } = useContext(SliderContex);

  return (
    <>
      <Header />
      <div className="flex">
        {slider && <SideBarSlider />}
        <Outlet />
      </div>
    </>
  );
};

export default Body;

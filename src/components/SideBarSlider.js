import React from "react";
import { Link } from "react-router-dom";
import MenuItems from "./MenuItems";

import {
  HomeIcon,
  MusicalNoteIcon,
  LifebuoyIcon,
  PlayCircleIcon,
  PlayIcon,
  BuildingLibraryIcon,
  ClockIcon,
  VideoCameraIcon,
  ChartPieIcon,
  ArrowDownTrayIcon,
  HandThumbUpIcon,
  FireIcon,
  ShoppingBagIcon,
  NewspaperIcon,
} from "@heroicons/react/24/outline";

// import { HandThumsUpIcon } from "@heroicons/react/solid";

const SideBarSlider = () => {
  return (
    <div>
      <Link to={"/"}>
        <MenuItems Icon={HomeIcon} item={"Home"} />
      </Link>
      <Link to={"/history"}>
        <MenuItems Icon={ChartPieIcon} item={"History"} />
      </Link>
      <Link to={"/subscriptions"}>
        <MenuItems Icon={LifebuoyIcon} item={"Subscriptions"} />
      </Link>
      <Link to={"/likeVideo"}>
        <MenuItems Icon={HandThumbUpIcon} item={"Liked videos"} />
      </Link>
      <hr className="border border-spacing-2 bg-black ml-3"></hr>
      <MenuItems Icon={MusicalNoteIcon} item={"Shorts"} />
      <MenuItems Icon={BuildingLibraryIcon} item={"Library"} />
      <MenuItems Icon={PlayIcon} item={"Originals"} />
      <MenuItems Icon={PlayCircleIcon} item={"YouTube Music"} />

      <MenuItems Icon={VideoCameraIcon} item={"Your videos"} />
      <MenuItems Icon={ClockIcon} item={"Watch Later"} />
      <MenuItems Icon={ArrowDownTrayIcon} item={"Downloads"} />

      <hr className="border border-spacing-2 bg-black ml-3"></hr>
      <h2 className="font-bold text-xl ml-3">Explore</h2>
      <MenuItems Icon={FireIcon} item={"Trending"} />
      <MenuItems Icon={ShoppingBagIcon} item={"Shopping"} />
      <MenuItems Icon={MusicalNoteIcon} item={"Music"} />
      <MenuItems Icon={NewspaperIcon} item={"News"} />
    </div>
  );
};

export default SideBarSlider;

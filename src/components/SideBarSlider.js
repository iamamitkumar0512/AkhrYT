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

const SideBarSlider = () => {
  return (
    <div>
      <Link to={"/"}>
        <MenuItems Icon={HomeIcon} item={"Home"} />
      </Link>
      <MenuItems Icon={MusicalNoteIcon} item={"Shorts"} />
      <MenuItems Icon={LifebuoyIcon} item={"Subscriptions"} />
      <MenuItems Icon={PlayIcon} item={"Originals"} />
      <MenuItems Icon={PlayCircleIcon} item={"YouTube Music"} />
      <hr className="border border-spacing-2 bg-black ml-3"></hr>
      <MenuItems Icon={BuildingLibraryIcon} item={"Library"} />
      <MenuItems Icon={ChartPieIcon} item={"History"} />
      <MenuItems Icon={VideoCameraIcon} item={"Your videos"} />
      <MenuItems Icon={ClockIcon} item={"Watch Later"} />
      <MenuItems Icon={ArrowDownTrayIcon} item={"Downloads"} />
      <MenuItems Icon={HandThumbUpIcon} item={"Liked videos"} />
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

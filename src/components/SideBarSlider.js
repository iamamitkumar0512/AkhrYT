import React from "react";
import { Link } from "react-router-dom";

const SideBarSlider = () => {
  return (
    <div className="shadow-lg p-1 m-2 w-1/12 h-auto">
      <br />
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <li>Shorts</li>
        <li>Subscriptions</li>
      </ul>
      <br />
      <hr />
      <br />
      <ul>
        <li>Library</li>
        <li>History</li>
        <li>Watch Later</li>
        <li>Liked Video</li>
      </ul>
      <br />
      <hr />
      <br></br>
      <h4 className="font-bold">Explore</h4>
      <br />
      <ul>
        <li>Trending</li>
        <li>Shopping</li>
        <li>Music</li>
        <li>Live</li>
        <li>Gaming</li>
        <li>Sports</li>
        <li>Fashion</li>
        <li>Beauty</li>
        <li>Learning</li>
      </ul>
    </div>
  );
};

export default SideBarSlider;

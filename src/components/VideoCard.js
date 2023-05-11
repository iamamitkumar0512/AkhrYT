import React from "react";
import useTime from "../utils/useTime";
import useViews from "../utils/useViews";

const VideoCard = ({ thumbnail, name, views, channelTitel, time }) => {
  const view = useViews(views);
  const pastTime = new Date(time);
  const newTime = useTime(pastTime);
  return (
    <div className="m-2 w-72 mb-2 rounded-lg">
      <img
        alt={name}
        src={thumbnail}
        className="rounded-lg mb-2 hover:scale-110"
      ></img>
      <p className="text-black font-semibold">{name}</p>
      <p className="font-normal text-gray-600">{channelTitel}</p>
      <p>{view + " || " + newTime}</p>
    </div>
  );
};

export default VideoCard;

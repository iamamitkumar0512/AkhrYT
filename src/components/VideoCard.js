import React from "react";
import useTime from "../utils/useTime";
import useViews from "../utils/useViews";

const VideoCard = ({ thumbnail, name, views, channelTitel, time }) => {
  const view = useViews(views);
  const pastTime = new Date(time);
  const newTime = useTime(pastTime);
  return (
    <div className="p-2 m-2 border border-red-300 shadow-lg">
      <img className="rounded-xl " alt={name} src={thumbnail} />
      <h2 className="font-bold max-w-xs">{name}</h2>
      <h5>{channelTitel}</h5>
      <p>{view + " || " + newTime}</p>
    </div>
  );
};

export default VideoCard;

import React from "react";
import useTime from "../utils/useTime";
import useViews from "../utils/useViews";

const RecommedVideoCard = ({ thumbnail, name, views, channelTitel, time }) => {
  const view = useViews(views);
  const pastTime = new Date(time);
  const newTime = useTime(pastTime);
  return (
    <div className="p-2 m-2 border border-gray-600 shadow-lg h-60 flex flex-row">
      <img className="rounded-xl" alt={name} src={thumbnail} />
      <div className="flex flex-col">
        <h2 className="max-w-xs font-bold">{name}</h2>
        <br></br>
        <h5>{channelTitel}</h5>
        <br></br>
        <p>{view + " || " + newTime}</p>
      </div>
    </div>
  );
};

export default RecommedVideoCard;

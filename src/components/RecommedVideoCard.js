import React from "react";
import useTime from "../utils/useTime";
import useViews from "../utils/useViews";

const RecommedVideoCard = ({ thumbnail, name, views, channelTitel, time }) => {
  const view = useViews(views);
  const pastTime = new Date(time);
  const newTime = useTime(pastTime);
  return (
    <div className="p-2 m-2 flex flex-row">
      <img className="rounded-lg m-2" alt={name} src={thumbnail} />
      <div className="flex flex-col">
        <p className="text-black font-semibold m-1">{name}</p>
        <h5 className="m-1">{channelTitel}</h5>
        <p className="m-1">{view + " || " + newTime}</p>
      </div>
    </div>
  );
};

export default RecommedVideoCard;

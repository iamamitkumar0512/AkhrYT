import React from "react";
import useTime from "../utils/useTime";

function HistoryVideoCard({ videoInfo }) {
  const { snippet } = videoInfo;
  const pastTime = new Date(snippet.publishedAt);
  const newTime = useTime(pastTime);

  return (
    <div className="m-1 mb-6 flex">
      <img
        className="rounded-lg"
        alt=""
        src={snippet.thumbnails.medium.url}
      ></img>
      <div className="ml-5">
        <h3 className="text-lg font-bold">{snippet.title}</h3>
        <h3 className="font-semibold">{snippet.channelTitle}</h3>
        <p>{newTime}</p>
      </div>
    </div>
  );
}

export default HistoryVideoCard;

import React, { useState } from "react";
import { yt_channel_api, yt_channel_api2 } from "../utils/constant";
import { useEffect } from "react";

const SubscriptionCard = ({ id }) => {
  const [channelData, setChannelData] = useState({});

  useEffect(() => {
    channelInfo(id);
  }, []);

  async function channelInfo(id) {
    const data = await fetch(yt_channel_api + id + yt_channel_api2);
    const json = await data.json();
    setChannelData(json.items);
  }

  return (
    <div className="m-1 mb-6 flex">
      <img
        className="rounded-lg"
        alt=""
        src={channelData[0]?.snippet?.thumbnails?.medium?.url}
      ></img>
      <div className="ml-5">
        <h3 className="text-lg font-bold">{channelData[0]?.snippet?.title}</h3>
        <p className="text-gray-600">{channelData[0]?.snippet?.description}</p>
      </div>
    </div>
  );
};

export default SubscriptionCard;

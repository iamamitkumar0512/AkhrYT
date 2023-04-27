import React, { useEffect } from "react";
import { useState } from "react";
import { yt_api } from "../utils/constant";
import VideoCard from "./VideoCard";

const VideoConatiner = () => {
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    fetchData(yt_api);
    // console.log(videoData);
  }, []);

  async function fetchData(yt_api) {
    try {
      const responce = await fetch(yt_api);
      const data = await responce.json();
      setVideoData(data.items);
      // console.log(videoData);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="flex flex-wrap">
      {videoData.length &&
        videoData.map((i) => {
          return (
            <VideoCard
              key={i?.id}
              name={i?.snippet?.title}
              thumbnail={i?.snippet.thumbnails?.medium?.url}
              channelTitel={i?.snippet?.channelTitle}
              views={i?.statistics?.viewCount}
              time={i?.snippet?.publishedAt}
            />
          );
        })}
    </div>
  );
};

export default VideoConatiner;

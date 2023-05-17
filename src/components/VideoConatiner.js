import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { yt_api } from "../utils/constant";
import { addVideo } from "../utils/historySlice";
import VideoCard from "./VideoCard";

const VideoConatiner = () => {
  const [videoData, setVideoData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchData(yt_api);
  }, []);

  async function fetchData(yt_api) {
    try {
      const responce = await fetch(yt_api);
      const data = await responce.json();
      setVideoData(data.items);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="flex flex-wrap">
      {videoData.length &&
        videoData.map((i) => {
          return (
            <Link
              to={"/watch?v=" + i.id}
              state={i}
              key={i.id}
              onClick={() => {
                dispatch(addVideo(i));
              }}
            >
              <VideoCard
                key={i?.id}
                name={i?.snippet?.title}
                thumbnail={i?.snippet.thumbnails?.medium?.url}
                channelTitel={i?.snippet?.channelTitle}
                views={i?.statistics?.viewCount}
                time={i?.snippet?.publishedAt}
              />
            </Link>
          );
        })}
    </div>
  );
};

export default VideoConatiner;

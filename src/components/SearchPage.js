import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { yt_search_api } from "../utils/constant";
import SearchVideoCard from "./SearchVideoCard";
import { addVideo } from "../utils/historySlice";
import { useDispatch } from "react-redux";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [searchVideos, setSearchVideos] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchParams.get("q")) {
      searchResult();
    }
  }, [searchParams]);

  const searchResult = async () => {
    const data = await fetch(yt_search_api + searchParams.get("q"));
    const json = await data.json();
    setSearchVideos(json.items);
  };

  return (
    <div className="m-2 p-2 ml-14">
      {searchVideos?.map((video) => {
        return (
          <Link
            key={video.id.videoId}
            to={`/watch?v=${video.id.videoId}`}
            state={video}
            onClick={() => {
              dispatch(addVideo(video));
            }}
          >
            <SearchVideoCard videoInfo={video} />{" "}
          </Link>
        );
      })}
    </div>
  );
};

export default SearchPage;

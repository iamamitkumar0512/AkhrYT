import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HistoryVideoCard from "./HistoryVideoCard";

const LikeVideoPage = () => {
  const likeVideoData = useSelector((store) => store.like.likeArray);

  return (
    <div className="m-2 p-2 ml-14">
      <h2 className="font-bold">Liked Videos</h2>
      <br></br>
      {likeVideoData.length ? (
        likeVideoData?.map((video) => {
          return (
            <Link key={video.id} to={`/watch?v=${video.id}`} state={video}>
              <HistoryVideoCard videoInfo={video} />{" "}
            </Link>
          );
        })
      ) : (
        <h1 className="font-medium px-96">This list has no videos</h1>
      )}
    </div>
  );
};

export default LikeVideoPage;

import { useLocation, useSearchParams } from "react-router-dom";
import SliderContex from "../utils/SliderContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecommedVideoCard from "./RecommedVideoCard";
import { yt_api1 } from "../utils/constant";
import CommentList from "./CommentList";
import { useDispatch, useSelector } from "react-redux";
import { addVideo } from "../utils/historySlice";
import { unSubscribe, addSubscribe } from "../utils/subscriptionSlice";
import { dislike, liked } from "../utils/likeSlice";

import {
  HandThumbUpIcon,
  HandThumbDownIcon,
} from "@heroicons/react/24/outline";

const VideoPlayer = () => {
  let [searchParams] = useSearchParams();
  const id = searchParams.get("v");
  const { setSlider } = useContext(SliderContex);
  const { state } = useLocation();
  const [commentData, setCommentData] = useState([]);

  const [more, setMore] = useState(false);
  const [show, setShow] = useState(false);
  const date = new Date(state?.snippet?.publishedAt);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  const [videoData, setVideoData] = useState([]);
  const dispatch = useDispatch();

  const subscribeArray = useSelector(
    (store) => store.subscription.subscriptionArray
  );
  const likeArray = useSelector((store) => store.like.likeArray);

  async function fetchData(yt_api) {
    try {
      const responce = await fetch(yt_api);
      const data = await responce.json();
      setVideoData(data.items);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchComment() {
    try {
      const commentapi =
        "https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=" +
        id +
        "&maxResults=100&key=AIzaSyCUtHkJVJC7N4H6bMmG82Y3CF_fRRmTK4k";
      const responce = await fetch(commentapi);
      const data = await responce.json();
      setCommentData(data.items);
    } catch (err) {
      console.log(err);
    }
  }

  const checkLikeVideo = function (id, likeArray) {
    for (let i = 0; i < likeArray.length; i++) {
      if (likeArray[i].id === id) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    setSlider(false);
    fetchData(yt_api1);
    fetchComment();
    setMore(false);
    setShow(false);
  }, [id]);

  return (
    <div className="flex flex-row justify-between">
      <div className="m-12">
        <iframe
          width="560"
          height="315"
          src={"https://www.youtube.com/embed/" + id}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
        <h2 className="font-bold max-w-xl">{state?.snippet?.title}</h2>
        <br></br>
        <div className="flex flex-row justify-between">
          <h2 className="font-bold">{state?.snippet?.channelTitle}</h2>
          {subscribeArray.includes(state?.snippet?.channelId) ? (
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded-full"
              onClick={() => dispatch(unSubscribe(state?.snippet?.channelId))}
            >
              Subscribed
            </button>
          ) : (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full"
              onClick={() => dispatch(addSubscribe(state?.snippet?.channelId))}
            >
              Subscribe
            </button>
          )}
          {checkLikeVideo(state?.id, likeArray) ? (
            <button
              className="flex bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded-full"
              onClick={() => dispatch(dislike(state))}
            >
              <HandThumbDownIcon className="h-5 w-5" />
              Dislike
            </button>
          ) : (
            <button
              className=" flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full"
              onClick={() => dispatch(liked(state))}
            >
              <HandThumbUpIcon className="h-5 w-5" />
              Like
            </button>
          )}
          <h2>💖 {state?.statistics?.likeCount}</h2>
        </div>
        <div className="max-w-xl rounded-lg bg-gray-800 p-2 mt-3">
          <p>
            <span className="font-bold  text-white ">
              {state?.statistics?.viewCount} views{" "}
            </span>
            {"  "}
            <span className="font-bold  text-white ">{formattedDate} </span>
            <span className="text-blue-800">
              {"  #"}
              {state?.snippet?.tags?.join(" #")}
              {"  "}
            </span>
          </p>
          {!more ? (
            <button onClick={() => setMore(true)}>more...⬇️</button>
          ) : (
            <p className="text-white">
              {" "}
              <br></br>
              {state?.snippet?.description}
            </p>
          )}
        </div>
        <div className="max-w-xl bg-gray-200 rounded">
          <div className="flex flex-row justify-between p-2  mt-3">
            <h2 className="font-bold py-2 px-4">Comments</h2>
            {show ? (
              <button
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                onClick={() => setShow(false)}
              >
                Hide
              </button>
            ) : (
              <button
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                onClick={() => setShow(true)}
              >
                Show
              </button>
            )}
          </div>
          {show ? <CommentList comments={commentData} /> : ""}
        </div>
      </div>
      <div className="flex flex-col m-10">
        {videoData.length &&
          videoData.map((i) => {
            return (
              <Link
                to={"/watch?v=" + i.id}
                state={i}
                key={i.id}
                onClick={() => dispatch(addVideo(i))}
                // videoData={videoData}
              >
                <RecommedVideoCard
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
    </div>
  );
};

export default VideoPlayer;

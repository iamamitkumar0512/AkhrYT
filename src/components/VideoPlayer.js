import { useLocation, useSearchParams } from "react-router-dom";
import SliderContex from "../utils/SliderContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecommedVideoCard from "./RecommedVideoCard";
import { yt_api1 } from "../utils/constant";

const VideoPlayer = () => {
  let [searchParams] = useSearchParams();
  const id = searchParams.get("v");
  const { setSlider } = useContext(SliderContex);
  const { state } = useLocation();

  const [more, setMore] = useState(false);
  const [subscribe, setSubscribe] = useState(false);
  const date = new Date(state?.snippet?.publishedAt);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  const [videoData, setVideoData] = useState([]);

  async function fetchData(yt_api) {
    try {
      const responce = await fetch(yt_api);
      const data = await responce.json();
      setVideoData(data.items);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setSlider(false);
    fetchData(yt_api1);
    console.log(videoData);
  }, []);

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
          {subscribe ? (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full"
              onClick={() => setSubscribe(false)}
            >
              Subscribe
            </button>
          ) : (
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded-full"
              onClick={() => setSubscribe(true)}
            >
              Subscribed
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
      </div>
      <div className="flex flex-col m-10">
        {videoData.length &&
          videoData.map((i) => {
            return (
              <Link
                to={"/watch?v=" + i.id}
                state={i}
                key={i.id}
                videoData={videoData}
              >
                <RecommedVideoCard
                  key={i?.id}
                  name={i?.snippet?.title}
                  thumbnail={i?.snippet.thumbnails?.default?.url}
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

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HistoryVideoCard from "./HistoryVideoCard";
import { clearHistory, updateHistory } from "../utils/historySlice";

const HistoryPage = () => {
  const historyData = useSelector((store) => store.history.videoHistory);
  // console.log(historyData);
  const dispatch = useDispatch();
  return (
    <div className="m-2 p-2 ml-14">
      <div className="flex flex-row justify-between">
        <h2 className="font-bold">Watch history</h2>
        {historyData.length ? (
          <button
            className="text-gray-900 bg-white border border-gray-300  font-medium rounded-full text-sm px-2 py-1 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600"
            onClick={() => {
              dispatch(clearHistory());
            }}
          >
            Clear History
          </button>
        ) : (
          " "
        )}
      </div>
      <br></br>
      {historyData.length ? (
        historyData?.map((video) => {
          return (
            <Link
              key={video.id}
              to={`/watch?v=${video.id}`}
              state={video}
              onClick={() => {
                dispatch(updateHistory(video));
              }}
            >
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

export default HistoryPage;

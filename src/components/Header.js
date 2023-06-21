import React, { useContext, useEffect, useState } from "react";
import SliderContex from "../utils/SliderContext";
import { yt_suggest_api } from "../utils/constant";
import { useRef } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  cacheResult,
  searchHistoryResult,
  updateSearchRefresh,
} from "../utils/searchSlice";
import { updateHistoryRefresh } from "../utils/historySlice";
import { updateLikeArrayRefresh } from "../utils/likeSlice";
import { updateSubscribeRefresh } from "../utils/subscriptionSlice";
import SignupModal from "./SignupModal";
import SignInModal from "./SignInModal";

const Header = () => {
  const { slider, setSlider } = useContext(SliderContex);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestion] = useState(true);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const suggestionRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchCache = useSelector((store) => store.search.searchQueryState);
  const searchHistory = useSelector((store) => store.search.searchHistoryState);

  const toogelHandler = () => {
    if (slider) {
      setSlider(false);
    } else {
      setSlider(true);
    }
  };

  const localStorageRefresh = () => {
    dispatch(updateHistoryRefresh());
    dispatch(updateLikeArrayRefresh());
    dispatch(updateSearchRefresh());
    dispatch(updateSubscribeRefresh());
  };
  useEffect(() => {
    localStorageRefresh();
  }, []);

  useEffect(() => {
    let suggestionHandler = (e) => {
      if (suggestionRef.current.contains(e.target)) {
        setShowSuggestion(true);
      } else {
        setShowSuggestion(false);
      }
    };
    document.addEventListener("mousedown", suggestionHandler);
    return () => document.removeEventListener("mousedown", suggestionHandler);
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!searchQuery) {
        setSuggestions(searchHistory);
      } else if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    if (!searchQuery) {
      return;
    }
    const data = await fetch(yt_suggest_api + searchQuery);
    const json = await data.json();
    setSuggestions(json[1]);
    let payload = {};
    payload[searchQuery] = json[1];
    dispatch(cacheResult(payload));
  };

  const searchClickhandler = (e) => {
    e.preventDefault();
    if (searchQuery) {
      dispatch(searchHistoryResult(searchQuery));
      setShowSuggestion(false);
      setSearchQuery("");
      // dispatch(searchHistory(searchQuery));
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <div className="grid grid-flow-col p-3 m-1 shadow-xl shadow-slate-300">
      <div className="flex col-span-1">
        <img
          onClick={() => toogelHandler()}
          className="h-10 cursor-pointer m-2"
          alt="hamburger"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHsZj_u_adaZgB1garqMpcgiDYsJ-t1T68ukqiwx2t_Sg0LJ_2IPV_cKcNyPl2JmLGoEg&usqp=CAU"
        />
        <Link to={"/"}>
          <img
            className="h-10 m-2"
            alt="yt-logo"
            src="data:image/png;base64,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"
          />
        </Link>
      </div>
      <div className="flex items-center col-span-10 justify-center">
        <form ref={suggestionRef} onSubmit={searchClickhandler}>
          <div className="flex items-center">
            <input
              type="text"
              className="border border-gray-300 w-96 rounded-l-full px-3 py-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
            ></input>
            <button
              className="border border-gray-300 px-4 py-1 rounded-r-full"
              onClick={searchClickhandler}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </div>
          {showSuggestions && (
            <div className="absolute bg-white py-2 w-96 rounded-md">
              <ul>
                {suggestions?.map((suggestion) => {
                  return (
                    <Link
                      to={`/search?q=${suggestion}`}
                      key={suggestion}
                      onClick={() => {
                        dispatch(searchHistoryResult(suggestion));
                        setSearchQuery("");
                        setShowSuggestion(false);
                      }}
                    >
                      <li className="px-5 py-1 mb-2 cursor-pointer flex hover:bg-gray-200">
                        <MagnifyingGlassIcon className="h-6 w-6 mr-2" />
                        {suggestion}
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </div>
          )}
        </form>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 ml-4"
        >
          <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
          <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
        </svg>
      </div>

      <div className="col-span-1">
        <img
          onClick={() => setShowSignupModal(true)}
          className="h-10 m-2"
          alt="user"
          src="data:image/png;base64,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"
        />
      </div>
      {showSignupModal ? <SignupModal /> : ""}
    </div>
  );
};

export default Header;

import { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Body from "./components/Body";
import BodyMainConatiner from "./components/BodyMainConatiner";
import VideoPlayer from "./components/VideoPlayer";
import SliderContex from "./utils/SliderContext";
import SearchPage from "./components/SearchPage";
import { Provider } from "react-redux";
import store from "./utils/store.js";
import HistoryPage from "./components/HistoryPage";
import SubscriptionPage from "./components/SubscriptionPage";
import LikeVideoPage from "./components/LikeVideoPage";
import Feedback from "./components/Feedback";
import OptionsPageTemp from "./components/OptionsPageTemp";
import {
  LifebuoyIcon,
  ChartPieIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";

import { useSelector } from "react-redux";

//----------------------------------------------------------------

// YT Clone
//   - Header
//     - Hamburger
//     - Yt logo
//     - SearchBar
//     - User
//   - Body
//     - Slider SideBar
//     - body mainConatiner
//       - list of buttons
//       - Video Container
//         - Watch Video Page
//           - Video Player
//           - Recommendation SideBar
//           - Comments

//--------------------------------------------------------
export const baseUrl = "https://akhryt-api.onrender.com";

function App() {
  const [slider, setSlider] = useState(false);
  return (
    <Provider store={store}>
      <div className="App">
        <SliderContex.Provider value={{ slider, setSlider }}>
          <RouterProvider router={appRouter} />
        </SliderContex.Provider>
      </div>
    </Provider>
  );
}

export const AuthRoute = ({ children1, children2 }) => {
  const userState = useSelector((store) => store.loginData.isLoggedIn);
  if (localStorage.getItem("authToken") && userState) {
    return children1;
  } else {
    return children2;
  }
};

const text = {
  history: {
    text1: "Keep track of what you watch",
    text2: "Watch history isn't viewable when signed out.",
  },
  subscription: {
    text1: "Don’t miss new videos",
    text2: "Sign in to see updates from your favorite YouTube channels",
  },
  likedVideo: {
    text1: "Keep track of what you likes",
    text2: "Liked video list isn't viewable when signed out.",
  },
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      { path: "/", element: <BodyMainConatiner /> },
      {
        path: "/feedback",
        element: <Feedback />,
      },
      {
        path: "watch",
        element: <VideoPlayer />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "history",
        element: (
          <AuthRoute
            children1={<HistoryPage />}
            children2={
              <OptionsPageTemp
                Icon={ChartPieIcon}
                text1={text.history.text1}
                text2={text.history.text2}
              />
            }
          ></AuthRoute>
        ),
      },
      {
        path: "subscriptions",
        element: (
          <AuthRoute
            children1={<SubscriptionPage />}
            children2={
              <OptionsPageTemp
                Icon={LifebuoyIcon}
                text1={text.subscription.text1}
                text2={text.subscription.text2}
              />
            }
          ></AuthRoute>
        ),
      },
      {
        path: "likeVideo",
        element: (
          <AuthRoute
            children1={<LikeVideoPage />}
            children2={
              <OptionsPageTemp
                Icon={HandThumbUpIcon}
                text1={text.likedVideo.text1}
                text2={text.likedVideo.text2}
              />
            }
          ></AuthRoute>
        ),
      },
    ],
  },
]);

export default App;

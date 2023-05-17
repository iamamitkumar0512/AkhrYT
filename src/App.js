import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      { path: "/", element: <BodyMainConatiner /> },
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
        element: <HistoryPage />,
      },
      {
        path: "subscriptions",
        element: <SubscriptionPage />,
      },
      {
        path: "likeVideo",
        element: <LikeVideoPage />,
      },
    ],
  },
]);

export default App;

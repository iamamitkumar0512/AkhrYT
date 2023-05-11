import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import BodyMainConatiner from "./components/BodyMainConatiner";
import Header from "./components/Header";
import VideoPlayer from "./components/VideoPlayer";
import SliderContex from "./utils/SliderContext";
import SearchPage from "./components/SearchPage";

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
    <div className="App">
      <SliderContex.Provider value={{ slider, setSlider }}>
        <Header />
        <RouterProvider router={appRouter} />
      </SliderContex.Provider>
    </div>
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
    ],
  },
]);

export default App;

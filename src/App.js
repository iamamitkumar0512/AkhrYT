import { useState } from "react";
import Body from "./components/Body";
import Header from "./components/Header";
import SliderContex from "./utils/SliderContext";

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
        <Body />
      </SliderContex.Provider>
    </div>
  );
}

export default App;

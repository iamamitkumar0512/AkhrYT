import { createSlice } from "@reduxjs/toolkit";

const likeSlice = createSlice({
  name: "like",
  initialState: {
    likeArray: [],
    // likedID: null,
  },
  reducers: {
    liked: (state, action) => {
      state.likeArray.push(action.payload);
    },
    dislike: (state, action) => {
      let data = JSON.parse(JSON.stringify(state.likeArray));
      let id = action.payload.id;
      if (id !== null) {
        data = data.filter((item) => item.id !== id);
      }
      state.likeArray = data;
    },
    // serachLikedVideo: (state, action) => {
    //   let data = JSON.parse(JSON.stringify(state.likeArray));
    //   let id = action.payload;
    //   let resultId = null;
    //   for (let i = 0; i < data.length; i++) {
    //     if (data[i].id === id) {
    //       resultId = id;
    //     }
    //   }
    //   state.likedID = resultId;
    // },
  },
});

export const { liked, dislike } = likeSlice.actions;
export default likeSlice.reducer;

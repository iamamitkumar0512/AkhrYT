import { createSlice } from "@reduxjs/toolkit";

const likeSlice = createSlice({
  name: "like",
  initialState: {
    likeArray: [],
  },
  reducers: {
    liked: (state, action) => {
      state.likeArray.push(action.payload);
      localStorage.setItem("like", JSON.stringify(state.likeArray));
    },
    dislike: (state, action) => {
      let data = JSON.parse(JSON.stringify(state.likeArray));
      let id = action.payload.id;
      if (id !== null) {
        data = data.filter((item) => item.id !== id);
      }
      state.likeArray = data;
      localStorage.setItem("like", JSON.stringify(state.likeArray));
    },
    updateLikeArrayRefresh: (state) => {
      const dataItems = JSON.parse(localStorage.getItem("like"));
      state.likeArray = dataItems || [];
    },
  },
});

export const { liked, dislike, updateLikeArrayRefresh } = likeSlice.actions;
export default likeSlice.reducer;

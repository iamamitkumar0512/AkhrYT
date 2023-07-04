import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { requestAPI } from "./connectionApi";
import { dislikeVideo, postLikeVideo } from "./likeVideoApiData";

export const fetchLikeVideos = createAsyncThunk(
  "likeArray/fetchLikeVideos",
  async () => {
    const response = await requestAPI("get", "/likeVideo", null, null);
    return response.data;
  }
);

const likeSlice = createSlice({
  name: "like",
  initialState: {
    likeArray: [],
  },
  reducers: {
    liked: (state, action) => {
      state.likeArray.push(action.payload);
      postLikeVideo(action.payload);
    },
    dislike: (state, action) => {
      let data = JSON.parse(JSON.stringify(state.likeArray));
      let id = action.payload.id;
      dislikeVideo(id);
      if (id !== null) {
        data = data.filter((item) => item.id !== id);
      }
      state.likeArray = data;
    },
  },
  extraReducers: {
    [fetchLikeVideos.fulfilled]: (state, action) => {
      state.likeArray = action.payload;
    },
  },
});

export const { liked, dislike, updateLikeArrayRefresh } = likeSlice.actions;
export default likeSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteHistory, postHistory } from "./historyApiData";
import { requestAPI } from "./connectionApi";

export const fetchHistoryData = createAsyncThunk(
  "history/fetchHistoryData",
  async () => {
    const response = await requestAPI("get", "/history", null, null);
    return response.data;
  }
);

const historySlice = createSlice({
  name: "history",
  initialState: {
    videoHistory: [],
  },
  reducers: {
    addVideo: (state, action) => {
      let data = JSON.parse(JSON.stringify(state.videoHistory));

      postHistory(action.payload);
      let id = action.payload.id;
      let flag = false;
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
          flag = true;
        }
      }
      if (flag) {
        data = data.filter((item) => item.id !== id);
      }
      state.videoHistory = data;
      state.videoHistory.unshift(action.payload);
    },
    clearHistory: (state) => {
      state.videoHistory = [];
      deleteHistory();
    },
    updateHistory: (state, action) => {
      let data = JSON.parse(JSON.stringify(state.videoHistory));
      postHistory(action.payload);
      let id = action.payload.id;
      if (id !== null) {
        data = data.filter((item) => item.id !== id);
      }
      state.videoHistory = data;
      state.videoHistory.unshift(action.payload);
    },
  },
  extraReducers: {
    [fetchHistoryData.fulfilled]: (state, action) => {
      state.videoHistory = action.payload;
    },
  },
});

export const { addVideo, clearHistory, updateHistory, updateHistoryRefresh } =
  historySlice.actions;
export default historySlice.reducer;

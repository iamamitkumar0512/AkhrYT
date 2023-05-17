import { createSlice } from "@reduxjs/toolkit";

const historySlice = createSlice({
  name: "history",
  initialState: {
    videoHistory: [],
  },
  reducers: {
    addVideo: (state, action) => {
      let data = JSON.parse(JSON.stringify(state.videoHistory));
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
    },
    updateHistory: (state, action) => {
      let data = JSON.parse(JSON.stringify(state.videoHistory));
      let id = action.payload.id;
      if (id !== null) {
        data = data.filter((item) => item.id !== id);
      }
      state.videoHistory = data;
      state.videoHistory.unshift(action.payload);
    },
  },
});

export const { addVideo, clearHistory, updateHistory } = historySlice.actions;
export default historySlice.reducer;

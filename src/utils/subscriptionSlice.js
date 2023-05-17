import { createSlice } from "@reduxjs/toolkit";

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    subscriptionArray: [],
  },
  reducers: {
    addSubscribe: (state, action) => {
      state.subscriptionArray.push(action.payload);
      localStorage.setItem(
        "subscribe",
        JSON.stringify(state.subscriptionArray)
      );
    },
    unSubscribe: (state, action) => {
      let data = JSON.parse(JSON.stringify(state.subscriptionArray));
      let id = action.payload;
      if (id !== null) {
        data = data.filter((item) => item !== id);
      }
      state.subscriptionArray = data;
      localStorage.setItem(
        "subscribe",
        JSON.stringify(state.subscriptionArray)
      );
    },
    updateSubscribeRefresh: (state) => {
      const dataItems = JSON.parse(localStorage.getItem("subscribe"));
      state.subscriptionArray = dataItems || [];
    },
  },
});

export const { addSubscribe, unSubscribe, updateSubscribeRefresh } =
  subscriptionSlice.actions;
export default subscriptionSlice.reducer;

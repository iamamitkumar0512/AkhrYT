import { createSlice } from "@reduxjs/toolkit";

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    subscriptionArray: [],
  },
  reducers: {
    addSubscribe: (state, action) => {
      state.subscriptionArray.push(action.payload);
    },
    unSubscribe: (state, action) => {
      let data = JSON.parse(JSON.stringify(state.subscriptionArray));
      let id = action.payload;
      if (id !== null) {
        data = data.filter((item) => item !== id);
      }
      state.subscriptionArray = data;
    },
  },
});

export const { addSubscribe, unSubscribe } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;

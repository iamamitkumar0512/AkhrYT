import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteSubscription, postSubscription } from "./subscriptionApiData";
import { requestAPI } from "./connectionApi";

export const fetchSubscriptionData = createAsyncThunk(
  "subscription/fetchSubscriptionData",
  async () => {
    const response = await requestAPI("get", "/subscription", null, null);
    return response.data;
  }
);

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    subscriptionArray: [],
  },
  reducers: {
    addSubscribe: (state, action) => {
      state.subscriptionArray.push(action.payload);
      postSubscription(action.payload);
    },
    unSubscribe: (state, action) => {
      let data = JSON.parse(JSON.stringify(state.subscriptionArray));
      let id = action.payload;
      deleteSubscription(action.payload);
      if (id !== null) {
        data = data.filter((item) => item !== id);
      }
      state.subscriptionArray = data;
    },
  },
  extraReducers: {
    [fetchSubscriptionData.fulfilled]: (state, action) => {
      state.subscriptionArray = action.payload;
    },
  },
});

export const { addSubscribe, unSubscribe } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;

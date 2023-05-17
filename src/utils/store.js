import { configureStore } from "@reduxjs/toolkit";
import historySlice from "./historySlice";
import likeSlice from "./likeSlice";
import searchSlice from "./searchSlice";
import subscriptionSlice from "./subscriptionSlice";

const store = configureStore({
  reducer: {
    search: searchSlice,
    history: historySlice,
    subscription: subscriptionSlice,
    like: likeSlice,
  },
});

export default store;

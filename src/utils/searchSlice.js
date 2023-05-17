const { createSlice } = require("@reduxjs/toolkit");

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchQueryState: {},
    searchHistoryState: [],
  },
  reducers: {
    cacheResult: (state, action) => {
      state.searchQueryState = { ...state.searchQueryState, ...action.payload };
    },
    searchHistoryResult: (state, action) => {
      state.searchHistoryState.splice(10, 1);
      state.searchHistoryState.unshift(action.payload);
    },
  },
});

export const { cacheResult, searchHistoryResult } = searchSlice.actions;

export default searchSlice.reducer;

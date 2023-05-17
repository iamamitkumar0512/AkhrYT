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
      localStorage.setItem("search", JSON.stringify(state.searchHistoryState));
    },
    updateSearchRefresh: (state) => {
      const dataItems = JSON.parse(localStorage.getItem("search"));
      state.searchHistoryState = dataItems || [];
    },
  },
});

export const { cacheResult, searchHistoryResult, updateSearchRefresh } =
  searchSlice.actions;

export default searchSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { Navigate } from "react-router-dom";

const loginDataSlice = createSlice({
  name: "loginData",
  initialState: {
    isLoggedIn: false,
    userData: {},
  },
  reducers: {
    setIsLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setLogout: (state) => {
      state.isLoggedIn = false;
      state.userData = {};
      localStorage.removeItem("authToken");
      window.location.reload();
    },
  },
});

export const { setLogout, setIsLoggedIn, setUserData } = loginDataSlice.actions;

export default loginDataSlice.reducer;

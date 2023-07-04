import { createSlice } from "@reduxjs/toolkit";

const modalStateSlice = createSlice({
  name: "modalState",
  initialState: {
    registerModalState: false,
    loginModalState: false,
    resetEmailState: false,
    resetOtpState: false,
    resetPasswordState: false,
    profileModalState: false,
    updateProfileState: false,
  },
  reducers: {
    setCloseBtn: (state) => {
      state.registerModalState = false;
      state.loginModalState = false;
      state.resetEmailState = false;
      state.resetOtpState = false;
      state.resetPasswordState = false;
      state.profileModalState = false;
      state.updateProfileState = false;
    },
    setRegisterModalState: (state) => {
      state.registerModalState = true;
      state.loginModalState = false;
      state.resetEmailState = false;
      state.resetOtpState = false;
      state.resetPasswordState = false;
      state.profileModalState = false;
      state.updateProfileState = false;
    },
    setLoginModalState: (state) => {
      state.registerModalState = false;
      state.loginModalState = true;
      state.resetEmailState = false;
      state.resetOtpState = false;
      state.resetPasswordState = false;
      state.profileModalState = false;
      state.updateProfileState = false;
    },
    setResetEmailState: (state) => {
      state.registerModalState = false;
      state.loginModalState = false;
      state.resetEmailState = true;
      state.resetOtpState = false;
      state.resetPasswordState = false;
      state.profileModalState = false;
      state.updateProfileState = false;
    },
    setResetOtpState: (state) => {
      state.registerModalState = false;
      state.loginModalState = false;
      state.resetEmailState = false;
      state.resetOtpState = true;
      state.resetPasswordState = false;
      state.profileModalState = false;
      state.updateProfileState = false;
    },
    setResetPasswordState: (state) => {
      state.registerModalState = false;
      state.loginModalState = false;
      state.resetEmailState = false;
      state.resetOtpState = false;
      state.resetPasswordState = true;
      state.profileModalState = false;
      state.updateProfileState = false;
    },
    setProfileState: (state) => {
      state.registerModalState = false;
      state.loginModalState = false;
      state.resetEmailState = false;
      state.resetOtpState = false;
      state.resetPasswordState = false;
      state.profileModalState = true;
      state.updateProfileState = false;
    },
    setUpdateProfileState: (state) => {
      state.registerModalState = false;
      state.loginModalState = false;
      state.resetEmailState = false;
      state.resetOtpState = false;
      state.resetPasswordState = false;
      state.profileModalState = false;
      state.updateProfileState = true;
    },
  },
});

export const {
  setCloseBtn,
  setLoginModalState,
  setProfileState,
  setRegisterModalState,
  setResetEmailState,
  setResetOtpState,
  setResetPasswordState,
  setUpdateProfileState,
} = modalStateSlice.actions;
export default modalStateSlice.reducer;

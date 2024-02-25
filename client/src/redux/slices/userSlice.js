// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    error: null,
  },
  reducers: {
    createUserSuccess: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    loginUserSuccess: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logoutUserSuccess: (state) => {
      state.user = null;
      state.error = null;
    },
  },
});

export const {
  createUserSuccess,
  loginUserSuccess,
  setError,
  logoutUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;

// slices/walletSlice.js
import { createSlice } from "@reduxjs/toolkit";

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    balance: 0.0,
    movements: [],
    total: 0.0,
  },
  reducers: {
    setWalletInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setWalletInfo } = walletSlice.actions;
export default walletSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import walletSlice from "../slices/walletSlice";
import movementSlice from "../slices/movementSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    wallet: walletSlice,
    movement: movementSlice,
  },
});

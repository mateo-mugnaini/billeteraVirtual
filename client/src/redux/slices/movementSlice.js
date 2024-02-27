import { createSlice } from "@reduxjs/toolkit";

export const movementSlice = createSlice({
  name: "movements",
  initialState: {
    list: [],
    error: null,
  },
  reducers: {
    createMovimientoSuccess: (state, action) => {
      state.list.push(action.payload);
      state.error = null;
    },
    fetchMovementsSuccess: (state, action) => {
      state.list = action.payload;
      console.log(state.list);
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { createMovimientoSuccess, fetchMovementsSuccess, setError } =
  movementSlice.actions;

export default movementSlice.reducer;

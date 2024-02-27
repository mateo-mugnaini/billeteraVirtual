import { createSlice } from "@reduxjs/toolkit";

export const walletSlice = createSlice({
  name: "wallets",
  initialState: {
    list: [], // Para almacenar la lista de carteras
    selectedWallet: null, // Para almacenar los detalles de la cartera seleccionada
    error: null,
  },
  reducers: {
    createWalletSuccess: (state, action) => {
      state.list.push(action.payload);
      state.error = null;
    },
    fetchWalletDetailsSuccess: (state, action) => {
      console.log(
        "Detalles de la cartera obtenidos con éxito:",
        action.payload
      );
      state.selectedWallet = action.payload;
      state.error = null;
    },
    updateWalletSaldoSuccess: (state, action) => {
      state.selectedWallet = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  createWalletSuccess,
  fetchWalletDetailsSuccess,
  updateWalletSaldoSuccess,
  setError,
} = walletSlice.actions;

export default walletSlice.reducer;

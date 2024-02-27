// actions/walletActions.js
import axios from "axios";

const URL = "http://localhost:3001";

export const fetchWalletInfo = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`${URL}/wallet/${userId}`);
    dispatch(setWalletInfo(response.data));
  } catch (error) {
    console.error("Error fetching wallet info:", error);
  }
};

export const increaseWalletBalance = (userId, amount) => async (dispatch) => {
  try {
    await axios.post(`${URL}/wallet/${userId}/add`, {
      amount,
    });
    dispatch(fetchWalletInfo(userId)); // Actualizar la información después de aumentar el saldo
  } catch (error) {
    console.error("Error increasing wallet balance:", error);
  }
};

export const decreaseWalletBalance = (userId, amount) => async (dispatch) => {
  try {
    await axios.post(`${URL}/wallet/${userId}/subtract`, {
      amount,
    });
    dispatch(fetchWalletInfo(userId)); // Actualizar la información después de disminuir el saldo
  } catch (error) {
    console.error("Error decreasing wallet balance:", error);
  }
};

export const setWalletInfo = (walletInfo) => ({
  type: "wallet/setWalletInfo",
  payload: walletInfo,
});

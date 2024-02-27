// walletAction.js
import axios from "axios";
import {
  createWalletSuccess,
  fetchWalletDetailsSuccess,
  updateWalletSaldoSuccess,
  setError,
} from "../slices/walletSlice";

/* ===================== CREATE WALLET ===================== */
export const createWallet = (userId) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:3001/wallets", {
      userId,
    });

    if (response.data) {
      dispatch(createWalletSuccess(response.data));

      // Después de crear la cartera, puedes también cargar sus detalles
      dispatch(fetchWalletDetails(response.data.id));

      return true; // Creación de la cartera exitosa
    } else {
      dispatch(setError("Error al crear la cartera. Inténtalo de nuevo."));
      return false; // Error en la creación de la cartera
    }
  } catch (error) {
    console.error("Error al crear la cartera:", error);
    dispatch(setError("Error al crear la cartera. Inténtalo de nuevo."));
    return false; // Error en la creación de la cartera
  }
};

/* ===================== FETCH WALLET DETAILS ===================== */
export const fetchWalletDetails = (walletId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/wallets/${walletId}`
    );
    dispatch(fetchWalletDetailsSuccess(response.data));
  } catch (error) {
    console.error("Error al obtener detalles de la cartera:", error);
    dispatch(
      setError("Error al obtener detalles de la cartera. Inténtalo de nuevo.")
    );
  }
};

/* ===================== UPDATE WALLET SALDO ===================== */
export const updateWalletSaldo = (walletId, monto) => async (dispatch) => {
  try {
    const response = await axios.put(
      `http://localhost:3001/wallets/${walletId}`,
      { montoIncremental: monto } // Usamos un campo llamado montoIncremental
    );

    if (response.data) {
      dispatch(updateWalletSaldoSuccess(response.data));
      console.log(response.data);
      return true; // Actualización de saldo exitosa
    } else {
      dispatch(
        setError(
          "Error al actualizar el saldo de la cartera. Inténtalo de nuevo."
        )
      );
      return false; // Error en la actualización de saldo
    }
  } catch (error) {
    console.error("Error al actualizar el saldo de la cartera:", error);
    dispatch(
      setError(
        "Error al actualizar el saldo de la cartera. Inténtalo de nuevo."
      )
    );
    return false; // Error en la actualización de saldo
  }
};

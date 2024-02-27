// movementAction.js
import axios from "axios";
import {
  createMovimientoSuccess,
  fetchMovementsSuccess,
  setError,
} from "../slices/movementSlice";

/* ===================== CREATE MOVIMIENTO ===================== */
export const createMovimiento = (movimientoData) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/movement",
      movimientoData
    );
    console.log(response.data);

    if (response.data) {
      dispatch(createMovimientoSuccess(response.data));
      return true; // Creación de movimiento exitosa
    } else {
      dispatch(setError("Error al crear el movimiento. Inténtalo de nuevo."));
      return false; // Error en la creación del movimiento
    }
  } catch (error) {
    console.error("Error al crear el movimiento:", error);
    dispatch(setError("Error al crear el movimiento. Inténtalo de nuevo."));
    return false; // Error en la creación del movimiento
  }
};

/* ===================== FETCH MOVEMENTS ===================== */
export const fetchMovements = (walletId) => async (dispatch) => {
  console.log(walletId);
  try {
    const response = await axios.get(
      `http://localhost:3001/movement/${walletId}`
    );
    dispatch(fetchMovementsSuccess(response.data));
    console.log(response.data);
  } catch (error) {
    console.error("Error al obtener los movimientos:", error);
    dispatch(setError("Error al obtener los movimientos. Inténtalo de nuevo."));
  }
};

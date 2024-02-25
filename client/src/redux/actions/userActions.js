import axios from "axios";
import {
  createUserSuccess,
  loginUserSuccess,
  setError,
  logoutUserSuccess,
} from "../slices/userSlice";
import { redirect } from "next/navigation";

/* ===================== USER REGISTER ===================== */
export const registerUser = (user) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:3001/users", user);

    if (response.data) {
      dispatch(createUserSuccess(response.data));
      return true; // Registro exitoso
    } else {
      dispatch(setError("Error en el registro. Inténtalo de nuevo."));
      return false; // Error en el registro
    }
  } catch (error) {
    console.error("Error en el registro:", error);
    dispatch(setError("Error en el registro. Inténtalo de nuevo."));
    return false; // Error en el registro
  }
};

/* ===================== USER LOGIN ===================== */
export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/users/login",
      credentials
    );

    if (response.data) {
      dispatch(loginUserSuccess(response.data));
      console.log(response.data);
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      return true; // Inicio de sesión exitoso
    } else {
      dispatch(setError("Credenciales inválidas. Inténtalo de nuevo."));
      return false; // Error en el inicio de sesión
    }
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    dispatch(setError("Error en el inicio de sesión. Inténtalo de nuevo."));
    return false; // Error en el inicio de sesión
  }
};

/* ===================== USER LOGOUT ===================== */
export const logoutUser = () => async (dispatch) => {
  try {
    localStorage.removeItem("userInfo");
    dispatch(logoutUserSuccess());

    // Redireccionar a la página de inicio o a donde desees después del logout
    // Por ejemplo, puedes redirigir a la página de autenticación
  } catch (error) {
    console.error("Error en el logout:", error);
    dispatch(setError("Error en el logout. Inténtalo de nuevo."));
  }
};

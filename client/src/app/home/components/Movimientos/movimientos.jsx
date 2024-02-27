"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  increaseWalletBalance,
  decreaseWalletBalance,
  fetchWalletInfo,
} from "@/redux/actions/billeteraAction"; // Ajusta la ruta correcta

const Movimientos = () => {
  const dispatch = useDispatch();
  const [monto, setMonto] = useState("");
  const [tipoMovimiento, setTipoMovimiento] = useState("");
  const [descripcionMovimiento, setDescripcionMovimiento] = useState("");

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;

  const userId = user.user.id;

  const handleTipoMovimiento = (tipo) => {
    setTipoMovimiento(tipo);
  };

  const handleDescripcionChange = (e) => {
    setDescripcionMovimiento(e.target.value);
  };

  const handleRealizarMovimiento = async () => {
    if (tipoMovimiento === "Ingreso") {
      console.log("Aumentando monto:", monto);
      await dispatch(increaseWalletBalance(userId, Number(monto))); // Reemplaza 1 con el ID del usuario actual
    } else if (tipoMovimiento === "Egreso") {
      console.log("Disminuyendo monto:", monto);
      await dispatch(decreaseWalletBalance(userId, Number(monto))); // Reemplaza 1 con el ID del usuario actual
    }

    // Puedes realizar más lógica aquí, como guardar el movimiento en una lista, etc.
    setMonto("");
    setTipoMovimiento("");
    setDescripcionMovimiento("");
    // Actualizar la información después de realizar el movimiento (opcional)
    dispatch(fetchWalletInfo(1)); // Reemplaza 1 con el ID del usuario actual
  };

  return (
    <div>
      <div>
        <p>Mi movimiento fue:</p>
        <button onClick={() => handleTipoMovimiento("Ingreso")}>Ingreso</button>
        <button onClick={() => handleTipoMovimiento("Egreso")}>Egreso</button>
      </div>
      {tipoMovimiento && (
        <div>
          <label>
            <input
              type="text"
              placeholder={`Ingrese la descripción del ${tipoMovimiento.toLowerCase()}`}
              value={descripcionMovimiento}
              onChange={handleDescripcionChange}
            />
          </label>
          <label>
            Monto:
            <input
              type="number"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
            />
          </label>
          <button onClick={handleRealizarMovimiento}>
            Realizar Movimiento
          </button>
        </div>
      )}
    </div>
  );
};

export default Movimientos;

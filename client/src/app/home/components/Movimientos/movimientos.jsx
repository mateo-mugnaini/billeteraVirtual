"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMovimiento } from "@/redux/actions/movementAction";
import { fetchWalletDetails } from "@/redux/actions/walletAction";

const MovimientoForm = () => {
  const dispatch = useDispatch();
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;

  const selectedWallet = useSelector((state) => state.wallet.selectedWallet);
  const userId = user.user.id; // Obtén el userId de tu sistema o desde la autenticación
  useEffect(() => {
    dispatch(fetchWalletDetails(userId));
  }, [dispatch]);

  const [tipo, setTipo] = useState("Ingreso");
  const [monto, setMonto] = useState(0);
  const [motivo, setMotivo] = useState("Deposito");
  const walletId = selectedWallet?.id; // Puedes obtener este valor de tu estado de Redux o de cualquier otra fuente

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear objeto con la información del movimiento
    const movimientoData = {
      walletId,
      tipo,
      monto,
      motivo, // Agregar el motivo al objeto de datos
    };

    // Llamar a la acción para crear el movimiento
    const success = await dispatch(createMovimiento(movimientoData));

    // Dentro de la acción createMovimiento en movementAction.js
    console.log("Movimiento Data:", movimientoData);

    if (success) {
      // Limpiar el formulario o realizar otras acciones después del éxito
      setTipo("Ingreso");
      setMonto(0);
      setMotivo(""); // Limpiar el motivo
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Tipo:
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="Ingreso">Ingreso</option>
          <option value="Egreso">Egreso</option>
        </select>
      </label>
      <br />
      <label>
        Motivo:
        <select value={motivo} onChange={(e) => setMotivo(e.target.value)}>
          {tipo === "Ingreso" ? (
            <>
              <option value="Deposito">Depósito</option>
              <option value="Sueldo">Sueldo</option>
              <option value="Ventas">Ventas</option>
              <option value="Otros">Otros</option>
            </>
          ) : (
            <>
              <option value="Compra">Compra</option>
              <option value="PagoFacturas">Pago de Facturas</option>
              <option value="Otros">Otros</option>
            </>
          )}
        </select>
      </label>
      <label>
        Monto:
        <input
          type="number"
          value={monto}
          onChange={(e) => setMonto(parseFloat(e.target.value))}
        />
      </label>
      <br />
      <button type="submit">Realizar Movimiento</button>
    </form>
  );
};

export default MovimientoForm;

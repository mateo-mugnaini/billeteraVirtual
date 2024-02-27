"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMovimiento } from "@/redux/actions/movementAction";
import { fetchWalletDetails } from "@/redux/actions/walletAction";
import styles from "./movimiento.module.css";

const MovimientoForm = () => {
  const dispatch = useDispatch();
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;

  const selectedWallet = useSelector((state) => state.wallet.selectedWallet);
  const userId = user?.user?.id; // Obtén el userId de tu sistema o desde la autenticación
  useEffect(() => {
    dispatch(fetchWalletDetails(userId));
  }, [dispatch]);

  const [tipo, setTipo] = useState("");
  const [monto, setMonto] = useState(0);
  const [motivo, setMotivo] = useState("");
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
    <form className={styles.Formulario} onSubmit={handleSubmit}>
      <label className={styles.Label}>
        Ingreso / Egreso
        <select
          className={styles.Select}
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option className={styles.Options} value="">
            Selecciona una opcion
          </option>
          <option className={styles.Options} value="Ingreso">
            Ingreso
          </option>
          <option className={styles.Options} value="Egreso">
            Egreso
          </option>
        </select>
      </label>
      <br />
      <label className={styles.Label}>
        Motivo:
        <select
          className={styles.Select}
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
        >
          {tipo === "Ingreso" ? (
            <>
              <option className={styles.Options} value="">
                Selecciona una opcion
              </option>
              <option className={styles.Options} value="Deposito">
                Depósito
              </option>
              <option className={styles.Options} value="Sueldo">
                Sueldo
              </option>
              <option className={styles.Options} value="Ventas">
                Ventas
              </option>
              <option className={styles.Options} value="Otros">
                Otros
              </option>
            </>
          ) : (
            <>
              <option className={styles.Options} value="">
                Selecciona una opcion
              </option>
              <option className={styles.Options} value="Compra">
                Compra
              </option>
              <option className={styles.Options} value="PagoFacturas">
                Pago de Facturas
              </option>
              <option className={styles.Options} value="Otros">
                Otros
              </option>
            </>
          )}
        </select>
      </label>
      <label className={styles.Label}>
        Monto:
        <input
          className={styles.Input}
          type="number"
          value={monto}
          onChange={(e) => setMonto(parseFloat(e.target.value))}
        />
      </label>
      <br />
      <button className={styles.Btn} type="submit">
        Realizar Movimiento
      </button>
    </form>
  );
};

export default MovimientoForm;

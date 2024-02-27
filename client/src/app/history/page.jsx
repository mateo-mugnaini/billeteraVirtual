"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovements } from "@/redux/actions/movementAction";
import { fetchWalletDetails } from "@/redux/actions/walletAction";

import styles from "./page.module.css"; // Importa tus estilos CSS
import Navbar from "../components/navbar/navbar";

const MovementHistory = () => {
  const dispatch = useDispatch();
  const ListMovements = useSelector((state) => state.movement.list);
  console.log(ListMovements);

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;

  const selectedWallet = useSelector((state) => state.wallet.selectedWallet);
  const userId = user.user.id;
  const walletId = selectedWallet?.id;

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        await dispatch(fetchWalletDetails(userId));
        if (walletId) {
          dispatch(fetchMovements(walletId));
        }
      }
    };
    fetchData();
  }, [dispatch, userId, walletId]);

  console.log(selectedWallet);
  return (
    <div>
      <Navbar />
      <h2>Movimientos Recientes</h2>
      <h1>Saldo Actual: ${selectedWallet.saldo}</h1>

      {ListMovements === null ? (
        <p>Cargando...</p>
      ) : ListMovements?.length > 0 ? (
        <table className={styles.movementsTable}>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Monto</th>
              <th>Motivo</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {ListMovements.map((movement) => (
              <tr key={movement.id}>
                <td>{movement.tipo}</td>
                <td>{movement.monto}</td>
                <td>{movement.motivo}</td>
                <td>{movement.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay movimientos registrados</p>
      )}
    </div>
  );
};

export default MovementHistory;

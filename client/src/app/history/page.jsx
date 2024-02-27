"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWalletInfo } from "@/redux/actions/billeteraAction";

const MovementsHistory = () => {
  const dispatch = useDispatch();
  const { movements, balance } = useSelector((state) => state.wallet);

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;

  const userId = user.user.id;
  console.log(userId);

  useEffect(() => {
    // Puedes cargar la información de la billetera al montar el componente
    dispatch(fetchWalletInfo(userId));
  }, [dispatch, userId]);
  return (
    <div>
      <h2>Movimientos de la billetera</h2>
      <p>Total actual: ${balance.toFixed(2)}</p>
      <table>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Monto</th>
            <th>Descripción</th>
            <th>Saldo Total</th>
          </tr>
        </thead>
        <tbody>
          {movements.map((movement, index) => (
            <tr key={index}>
              <td>{movement.type === "income" ? "Ingreso" : "Egreso"}</td>
              <td>${movement.amount.toFixed(2)}</td>
              <td>{movement.description}</td>
              <td>${movement.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default MovementsHistory;

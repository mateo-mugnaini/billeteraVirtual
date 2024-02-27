"use client";
import React, { useEffect } from "react";
import styles from "./saldo.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchWalletInfo } from "@/redux/actions/billeteraAction"; // Ajusta la ruta correcta

const Saldo = () => {
  const dispatch = useDispatch();
  const { balance } = useSelector((state) => state.wallet);

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;

  const userId = user.user.id;

  useEffect(() => {
    // Llamar a la acción para obtener la información inicial de la billetera
    dispatch(fetchWalletInfo(userId));
  }, [dispatch, userId]);

  return (
    <div className={styles.ContenedorGeneral}>
      <h1>Tu saldo es:</h1>
      <h2>${balance}</h2>
    </div>
  );
};

export default Saldo;

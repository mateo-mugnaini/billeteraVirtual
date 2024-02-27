// Saldo.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createWallet, fetchWalletDetails } from "@/redux/actions/walletAction";
import styles from "./saldo.module.css";

const Saldo = () => {
  const dispatch = useDispatch();
  const selectedWallet = useSelector((state) => state.wallet.selectedWallet);

  console.log(selectedWallet);
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
  const userId = user ? user.user.id : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!selectedWallet) {
          const walletCreationSuccess = await dispatch(createWallet(userId));
          if (!walletCreationSuccess) {
            return;
          }
        }

        // Obtener detalles de la cartera solo si selectedWallet está presente
        // y aún no tiene detalles
        if (selectedWallet && !selectedWallet.saldo) {
          dispatch(fetchWalletDetails(selectedWallet.id));
        }
      } catch (error) {
        console.error("Error al cargar detalles de la cartera:", error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [dispatch, userId, selectedWallet]);

  // Nuevo useEffect para actualizar automáticamente el saldo
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchWalletDetails(selectedWallet.id));
    }, 5000); // Actualiza cada 5 segundos, puedes ajustar este valor según tus necesidades

    return () => clearInterval(interval);
  }, [dispatch, selectedWallet]);

  if (!userId) {
    return <p>Usuario no autenticado</p>;
  }

  if (!selectedWallet) {
    return <p>Cargando...</p>;
  }

  return (
    <div className={styles.ContenedorGeneral}>
      <h1 className={styles.Saldo}>Saldo Actual</h1>
      <h1 className={styles.Saldo}>$ {selectedWallet.saldo}</h1>
    </div>
  );
};

export default Saldo;

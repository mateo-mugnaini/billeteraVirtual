"use client";
import React, { useEffect } from "react";
// import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

// Styles
import style from "./page.module.css";
import { fetchWalletDetails } from "@/redux/actions/walletAction";

// Components
import Navbar from "../components/navbar/navbar";
import Saldo from "./components/Saldo/saldo";
import Movimientos from "./components/Movimientos/movimientos";

// ... (imports)

const Home = () => {
  const dispatch = useDispatch();

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;

  const selectedWallet = useSelector((state) => state.wallet.selectedWallet);

  useEffect(() => {
    const userId = user.user.id; // Obtén el userId de tu sistema o desde la autenticación
    dispatch(fetchWalletDetails(userId));
  }, [dispatch]);

  return (
    <div className={style.ContenedorGeneral}>
      <div>
        <Navbar />
      </div>
      <div className={style.ContenedorGeneral2}>
        <div className={style.ContenedorSaldo}>
          {/* Pasamos la información de la cartera al componente Saldo */}
          <Saldo selectedWallet={selectedWallet} />
        </div>
        <div className={style.ContenedorSaldo}>
          {/* Pasamos la información de la cartera al componente Movimientos */}
          <Movimientos selectedWallet={selectedWallet} />
        </div>
      </div>
    </div>
  );
};

export default Home;

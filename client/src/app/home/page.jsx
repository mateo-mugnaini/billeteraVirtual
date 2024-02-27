"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

// Styles
import style from "./page.module.css";
import { fetchWalletDetails } from "@/redux/actions/walletAction";

// Components
import Navbar from "../components/navbar/navbar";
import Saldo from "./components/Saldo/saldo";
import Movimientos from "./components/Movimientos/movimientos";

const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;

  const selectedWallet = useSelector((state) => state.wallet.selectedWallet);

  useEffect(() => {
    const userId = user?.user?.id; // Obtén el userId de tu sistema o desde la autenticación
    dispatch(fetchWalletDetails(userId));
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className={style.ContenedorGeneral}>
      <div>
        <Navbar />
      </div>
      <div className={style.ContenedorGeneral2}>
        <div className={style.ContenedorSaldo}>
          <Saldo selectedWallet={selectedWallet} />
        </div>
        <div className={style.ContenedorSaldo}>
          <Movimientos selectedWallet={selectedWallet} />
        </div>
      </div>
    </div>
  );
};

export default Home;

"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

// Styles
import style from "./page.module.css";

// Components
import Navbar from "../components/navbar/navbar";
import Saldo from "./components/Saldo/saldo";
import Movimientos from "./components/Movimientos/movimientos";

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      router.push("/"); // Redirigir al usuario a la página principal
    }
  }, [router]);
  return (
    <div className={style.ContenedorGeneral}>
      <div>
        <Navbar />
      </div>
      <div className={style.ContenedorGeneral2}>
        <div className={style.ContenedorSaldo}>
          <Saldo />
        </div>
        <div className={style.ContenedorSaldo}>
          <Movimientos />
        </div>
      </div>
    </div>
  );
};

export default Home;

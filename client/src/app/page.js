"use client";
import React from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/redux/actions/userActions";
import { redirect } from "next/navigation";

const Home = () => {
  const dispatch = useDispatch();

  // Verificar si estamos en el navegador antes de acceder a localStorage
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;

  const handleLogout = () => {
    dispatch(logoutUser());
    redirect("/");
  };

  return (
    <div className={styles.ContenedorGeneral}>
      {user ? (
        <div className={styles.ContenedorBtnOut}>
          <button className={styles.BtnOut} onClick={handleLogout}>
            LogOut
          </button>
        </div>
      ) : (
        <div className={styles.ContenedorBtnOut}>
          <Link href="/auth" className={styles.BtnOut}>
            Log In
          </Link>
        </div>
      )}
      <div className={styles.ContenedorContenido}>
        <div className={styles.ContenedorContenido2}>
          <h1 className={styles.Titulo}>CoinControl</h1>
          <h1>BIENVENIDO {user?.user?.username}</h1>
          {!user ? (
            <div>
              <h2>
                Para obtener todas las funciones de esta app te recomendamos
                loguearte
              </h2>
            </div>
          ) : (
            <h2>
              <Link href="/home">Ir al Dashboard</Link>
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

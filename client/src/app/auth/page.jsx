"use client";
import React, { useState, useEffect } from "react";
import Login from "./components/login/page";
import Register from "./components/register/page";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
const Auth = () => {
  const router = useRouter();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      router.push("/"); // Redirigir al usuario a la página principal
    }
  }, [router]);
  const [isLogin, setIsLogin] = useState(false); // Inicia en falso para usar ContenedorIzq por defecto

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div
      className={`${styles.ContenedorGeneral} ${
        isLogin ? styles.ContenedorIzq : styles.ContenedorDer
      }`}
    >
      <div
        className={`${styles.AuthContainer} ${
          isLogin ? styles.LoginLeft : styles.RegisterRight
        }`}
      >
        <div
          className={`${styles.Contenedor1} ${
            isLogin ? styles.ContenedorLogin : styles.ContenedorRegister
          }`}
        >
          {isLogin ? <Login /> : <Register />}
          <p className={styles.Redireccion} onClick={toggleForm}>
            {isLogin
              ? "¿No tienes una cuenta? Regístrate"
              : "¿Ya tienes una cuenta? Inicia sesión"}
          </p>
        </div>
      </div>
      <div className={styles.ContenedorTitulo}>
        <h1 className={styles.Titulo}>CoinControl</h1>
      </div>
    </div>
  );
};

export default Auth;

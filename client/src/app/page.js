"use client";
import React from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/redux/actions/userActions";
import { redirect } from "next/navigation";

const Home = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
    redirect("/");
  };

  const user = JSON.parse(localStorage.getItem("userInfo"));
  console.log(user);
  return (
    <div className={styles.ContenedorGeneral}>
      {user ? (
        <div>
          <button onClick={handleLogout}>LogOut</button>
        </div>
      ) : null}
      <div>
        <h1>BIENVENIDO {user?.user?.username}</h1>
        {!user ? (
          <div>
            <h2>Para obtener todas las funciones de esta app</h2>
            <h2>
              te recomendamos loguearte <Link href="/auth">aqui</Link>
            </h2>
          </div>
        ) : (
          <h2>
            Haz <Link href="/home">aqui</Link> para comenzar
          </h2>
        )}
      </div>
    </div>
  );
};

export default Home;

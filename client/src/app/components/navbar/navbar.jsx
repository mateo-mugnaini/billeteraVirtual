"use client";
import Link from "next/link";
import { useDispatch } from "react-redux";
import styles from "./navbar.module.css";
import React from "react";
import { logoutUser } from "@/redux/actions/userActions";
import { useRouter } from "next/navigation";

import { FiTrendingUp } from "react-icons/fi";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/");
  };

  return (
    <div className={styles.ContenedorGeneral}>
      <div className={styles.ContenedorLogo}>
        <h1 className={styles.Titulo}>Cashflow Trucker</h1>
        <FiTrendingUp className={styles.Logo} />
      </div>
      <Link className={styles.Link} href="/home">
        <h2>Home</h2>
      </Link>
      <Link className={styles.Link} href="/history">
        <h2>Historial</h2>
      </Link>
      <button className={styles.BtnOut} onClick={handleLogout}>
        LogOut
      </button>
    </div>
  );
};

export default Navbar;

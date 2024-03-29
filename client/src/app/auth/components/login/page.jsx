"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../../redux/actions/userActions";
import { useRouter } from "next/navigation";
import styles from "../pages.module.css";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const success = await dispatch(loginUser({ email, password }));

      if (success) {
        alert("Login successful");
        console.log("Login successful");
        router.push("/home");
        // Realizar acciones adicionales después de iniciar sesión
      } else {
        alert("Login failed");
        console.error("Login failed");
        // Manejar errores de inicio de sesión
      }
    } catch (error) {
      alert(`Error during login: ${error.message}`);
      console.error("Error during login:", error);
    }
  };

  return (
    <form className={styles.ContenedorGeneralForm} onSubmit={handleLogin}>
      <Link href="/" className={styles.BtnVolver}>
        <FiArrowLeft />
        Inicio
      </Link>
      <label className={styles.Label}>
        Usuario:
        <input
          className={styles.Input}
          type="text"
          value={email}
          placeholder="Usuario"
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className={styles.Label}>
        Contraseña:
        <input
          className={styles.Input}
          type="password"
          value={password}
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button className={styles.btn} type="submit">
        Iniciar Sesión
      </button>
    </form>
  );
};

export default Login;

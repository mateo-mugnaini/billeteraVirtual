// En tu componente de registro (Registro.js)
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "@/redux/actions/userActions";
import styles from "../pages.module.css";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

const Registro = () => {
  const dispatch = useDispatch();

  // Estado local para los campos del formulario
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    // Actualizar el estado local al escribir en los campos del formulario
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Llamar a la acción de registro
    const success = await dispatch(registerUser(formData));

    // Si el registro es exitoso, reiniciar los campos del formulario
    if (success) {
      alert("El registro ha sido exitoso. Haz clic en login para loguearte");
      setFormData({
        username: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <form className={styles.ContenedorGeneralForm} onSubmit={handleSubmit}>
      <Link href="/" className={styles.BtnVolver}>
        <FiArrowLeft />
        Inicio
      </Link>
      <label className={styles.Label}>
        Usuario:
        <input
          className={styles.Input}
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Nombre de usuario"
        />
      </label>
      <label className={styles.Label}>
        Correo:
        <input
          className={styles.Input}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
        />
      </label>
      <label className={styles.Label}>
        Contraseña:
        <input
          className={styles.Input}
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Contraseña"
        />
      </label>

      <button className={styles.btn} type="submit">
        Registrarse
      </button>
    </form>
  );
};

export default Registro;

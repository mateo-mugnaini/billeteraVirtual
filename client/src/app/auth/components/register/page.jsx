// En tu componente de registro (Registro.js)
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "@/redux/actions/userActions";

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Nombre de usuario"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Correo electrónico"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Contraseña"
      />
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default Registro;

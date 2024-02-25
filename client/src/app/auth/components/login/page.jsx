"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../../redux/actions/userActions";
import { useRouter } from "next/navigation";

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
        router.push("/");
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
    <form onSubmit={handleLogin}>
      <label>
        Usuario:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Contraseña:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};

export default Login;

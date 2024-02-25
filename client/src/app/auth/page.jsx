"use client";
import React, { useState, useEffect } from "react";
import Login from "./components/login/page";
import Register from "./components/register/page";
import { useRouter } from "next/navigation";

const Auth = () => {
  const router = useRouter();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      router.push("/"); // Redirigir al usuario a la página principal
    }
  }, [router]);
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      {isLogin ? <Login /> : <Register />}
      <p onClick={toggleForm}>
        {isLogin
          ? "¿No tienes una cuenta? Regístrate"
          : "¿Ya tienes una cuenta? Inicia sesión"}
      </p>
    </div>
  );
};

export default Auth;

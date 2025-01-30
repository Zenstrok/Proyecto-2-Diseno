import React, { useContext, useState } from "react";
import { AppContext } from "/src/context/AppContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "/src/services/supabase";
import { comparePassword } from "/src/services/hashUtils";

function Login() {
  const { idioma, tema } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ usuario: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { usuario, password } = formData;

    // Buscar el usuario en la base de datos
    const { data, error } = await supabase
      .from("usuarios")
      .select("hash")
      .eq("correoelectronico", usuario)
      .single();

    if (error || !data) {
      setMessage(
        idioma === "en"
          ? "Invalid email or password"
          : "Correo o contraseña inválidos"
      );
      return;
    }

    // Comparar la contraseña
    const isValidPassword = await comparePassword(password, data.hash);
    if (isValidPassword) {
      navigate("/inicio");
    } else {
      setMessage(
        idioma === "en"
          ? "Invalid email or password"
          : "Correo o contraseña inválidos"
      );
    }
  };

  return (
    <div className={`Login ${tema}`}>
      <header>
        <h1>{idioma === "en" ? "Login" : "Iniciar Sesión"}</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="usuario">
              {idioma === "en" ? "Email" : "Correo Electrónico"}
            </label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">
              {idioma === "en" ? "Password" : "Contraseña"}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">
            {idioma === "en" ? "Login" : "Iniciar sesión"}
          </button>
          <button type="button" onClick={() => navigate("/registro")}>
            {idioma === "en" ? "Register" : "Registrarse"}
          </button>
        </form>
        {message && <p>{message}</p>}
      </main>
      <footer>
        {idioma === "en"
          ? "Summer Software Design Project, 2024"
          : "Proyecto de Diseño de Software de Verano, 2024"}
      </footer>
    </div>
  );
}

export default Login;

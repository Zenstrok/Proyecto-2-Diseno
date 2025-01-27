import React, { useContext } from "react";
import { AppContext } from "/src/context/AppContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { idioma, tema } = useContext(AppContext);

  return (
    <div className={`Login ${tema}`}>
      <header>
        <h1>{idioma === "en" ? "Login" : "Iniciar Sesión"}</h1>
      </header>
      <main>
        <form>
          <div>
            <label htmlFor="usuario">
              {idioma === "en" ? "Username" : "Usuario"}
            </label>
            <input type="text" id="usuario" name="usuario" required />
          </div>
          <div>
            <label htmlFor="password">
              {idioma === "en" ? "Password" : "Contraseña"}
            </label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">
            {idioma === "en" ? "Login" : "Iniciar sesión"}
          </button>
        </form>
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

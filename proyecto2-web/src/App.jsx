import React from "react";
import "./App.css";
import { Routes, Route, Navigate, useLocation, Link } from "react-router-dom";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Inicio from "./pages/Inicio";
import Menu from "./pages/Menu";
import Notificaciones from "./pages/Notificaciones";
import Configuracion from "./pages/Configuracion";
import { AppContext } from "./context/AppContext.jsx";

function App() {
  const location = useLocation();
  const { tema, idioma, texto, user } = React.useContext(AppContext);
  const hideNav =
    location.pathname === "/login" || location.pathname === "/registro";

  return (
    <div className={`App ${tema}`}>
      {!hideNav && (
        <nav>
          <ul>
            <li>
              <Link to="/inicio">{idioma === "en" ? "Home" : "Inicio"}</Link>
            </li>
            <li>
              <Link to="/menu">{idioma === "en" ? "Menu" : "Menú"}</Link>
            </li>
        
            <li>
              <Link to="/notificaciones">
                {idioma === "en" ? "Notifications" : "Notificaciones"}
              </Link>
            </li>
            <li>
              <Link to="/configuracion">
                {idioma === "en" ? "Settings" : "Ajustes"}
              </Link>
            </li>
          </ul>
        </nav>
      )}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/notificaciones" element={<Notificaciones />} />
        <Route path="/configuracion" element={<Configuracion />} />
        <Route path="*" element={<Navigate to="/inicio" />} />
      </Routes>
    </div>
  );
}

export default App;

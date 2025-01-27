import React from "react";
import "./App.css";
import { BrowserRouter as Routes, Route, Navigate } from "react-router-dom";
import Inicio from "./pages/Inicio"; // Asegúrate de que Inicio.jsx esté en src/pages/

function App() {
  const location = useLocation();
  const { tema, idioma, texto, user } = React.useContext(AppContext);
  const hideNav = location.pathname === "/login";

  return (
    <div className={`App ${tema}`}>
      {!hideNav && (
        <nav>
          <ul>
            <li>
              <Link to="/inicio">{idioma === "en" ? "Home" : "Inicio"}</Link>
            </li>
            <li>
              <Link to="/personajes">
                {idioma === "en" ? "Characters" : "Personajes"}
              </Link>
            </li>
            <li>
              <Link to="/comics">{idioma === "en" ? "Comics" : "Cómics"}</Link>
            </li>
            <li>
              <Link to="/creadores">
                {idioma === "en" ? "Creators" : "Creadores"}
              </Link>
            </li>
            <li>
              <Link to="/configuracion">
                {idioma === "en" ? "Settings" : "Ajustes"}
              </Link>
            </li>
            {user && <li className="nombre-usuario">{user.name}</li>}
            {user && (
              <li className="imagen-usuario">
                <img
                  src={user.picture}
                  alt="User"
                  style={{ width: "40px", borderRadius: "50%" }}
                />
              </li>
            )}
          </ul>
        </nav>
      )}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inicio" element={<RutaProtegida element={Inicio} />} />
        <Route
          path="/personajes"
          element={<RutaProtegida element={Personajes} />}
        />
        <Route path="/comics" element={<RutaProtegida element={Comics} />} />
        <Route
          path="/creadores"
          element={<RutaProtegida element={Creadores} />}
        />
        <Route
          path="/configuracion"
          element={<RutaProtegida element={Configuracion} />}
        />
        <Route
          path="/personaje/:id"
          element={<RutaProtegida element={PersonajeDetalle} />}
        />
        <Route
          path="/comic/:id"
          element={<RutaProtegida element={ComicsDetalle} />}
        />
        <Route
          path="/creador/:id"
          element={<RutaProtegida element={CreadorDetalle} />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;

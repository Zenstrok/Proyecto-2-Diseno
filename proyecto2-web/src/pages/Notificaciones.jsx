import React, { useContext } from "react";
import { AppContext } from "/src/context/AppContext";
/* import "./Notificaciones.css"; */
import { useNavigate } from "react-router-dom";

function Notificaciones() {
  const { idioma, tema, texto, user } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className={`Notificaciones ${tema}`}>
      <header>
        <h1>{idioma === "en" ? "Notifications" : "Notificaciones"}</h1>
      </header>
      <main>
        <div>
          <h3>Hola</h3>
        </div>
      </main>
      <footer>
        {idioma === "en"
          ? "Summer Software Design Project, 2024"
          : "Proyecto de Diseño de Software de Verano, 2024"}
      </footer>
    </div>
  );
}

export default Notificaciones;

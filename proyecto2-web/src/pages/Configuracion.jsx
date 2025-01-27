import React, { useContext } from "react";
import { AppContext } from "/src/context/AppContext";
/* import "./Configuracion.css"; */
import { useNavigate } from "react-router-dom";

function Configuracion() {
  const { idioma, setIdioma, tema, setTema, texto, setTexto, user } =
    useContext(AppContext);
  const navigate = useNavigate();

  const manejarCambioIdioma = (e) => {
    setIdioma(e.target.value);
  };

  const manejarCambioTema = (e) => {
    setTema(e.target.value);
  };

  const manejarCambioTexto = (e) => {
    setTexto(e.target.value);
  };

  return (
    <div className={`Configuracion ${tema}`}>
      <header>
        <h1>{idioma === "en" ? "Settings" : "Ajustes"}</h1>
      </header>
      <main>
        <div>
          <label htmlFor="idioma">
            {idioma === "en" ? "Language:" : "Idioma:"}
          </label>
          <select value={idioma} onChange={manejarCambioIdioma} id="idioma">
            <option value="es">
              {idioma === "en" ? "Spanish" : "Español"}
            </option>
            <option value="en">{idioma === "en" ? "English" : "Inglés"}</option>
          </select>
        </div>
        <div>
          <label htmlFor="tema">{idioma === "en" ? "Theme:" : "Tema:"}</label>
          <select value={tema} onChange={manejarCambioTema} id="tema">
            <option value="claro">{idioma === "en" ? "Light" : "Claro"}</option>
            <option value="oscuro">
              {idioma === "en" ? "Dark" : "Oscuro"}
            </option>
          </select>
        </div>
        <div>
          <label htmlFor="texto">
            {idioma === "en" ? "Font Size:" : "Tamaño del Texto:"}
          </label>
          <select value={texto} onChange={manejarCambioTexto} id="texto">
            <option value="pequeno">
              {idioma === "en" ? "Small" : "Pequeño"}
            </option>
            <option value="mediano">
              {idioma === "en" ? "Medium" : "Mediano"}
            </option>
            <option value="grande">{idioma === "en" ? "Big" : "Grande"}</option>
          </select>
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

export default Configuracion;

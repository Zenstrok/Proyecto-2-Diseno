import React, { useContext } from "react";
import { AppContext } from "/src/context/AppContext";
/* import "./Ingredientes.css"; */
import { useNavigate } from "react-router-dom";

function Ingredientes() {
  const { idioma, tema, texto, user } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className={`Ingredientes ${tema}`}>
      <header>
        <h1>{idioma === "en" ? "Ingredients" : "Ingredientes"}</h1>
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

export default Ingredientes;

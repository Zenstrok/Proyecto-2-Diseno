import React, { useContext } from "react";
import { AppContext } from "/src/context/AppContext";
/* import "./Menu.css"; */
import { useNavigate } from "react-router-dom";

function Menu() {
  const { idioma, tema, texto, user } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className={`Menu ${tema}`}>
      <header>
        <h1>{idioma === "en" ? "Menu" : "Menú"}</h1>
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

export default Menu;

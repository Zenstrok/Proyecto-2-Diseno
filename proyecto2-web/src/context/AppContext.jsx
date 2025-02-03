import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cocina, setCocina] = useState(null);
  const [idioma, setIdioma] = useState(null);
  const [tema, setTema] = useState(null);
  const [texto, setTexto] = useState(null);

  // 🔹 Estado global para el modo oscuro
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true"; // Guardar en localStorage
  });

  // Guardar la preferencia en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <AppContext.Provider
      value={{
        cocina,
        setCocina,
        idioma,
        setIdioma,
        tema,
        setTema,
        texto,
        setTexto,
        darkMode, // 🔹 Agregamos el estado del tema
        setDarkMode, // 🔹 Función para cambiarlo
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

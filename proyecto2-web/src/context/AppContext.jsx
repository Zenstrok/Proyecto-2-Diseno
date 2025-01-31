import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cocina, setCocina] = useState(null);
  const [idioma, setIdioma] = useState("es");
  const [tema, setTema] = useState("light");
  const [texto, setTexto] = useState("md");

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cocina, setCocina] = useState(null);
  const [idioma, setIdioma] = useState(null);
  const [tema, setTema] = useState(null);
  const [texto, setTexto] = useState(null);

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

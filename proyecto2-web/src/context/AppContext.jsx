import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  /* const [idioma, setIdioma] = useState(null);
  const [tema, setTema] = useState(null);
  const [texto, setTexto] = useState(null); */
  const [cocina, setCocina] = useState(null);

  return (
    <AppContext.Provider
      value={{
        /* idioma,
        setIdioma,
        tema,
        setTema,
        texto,
        setTexto, */
        cocina,
        setCocina,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

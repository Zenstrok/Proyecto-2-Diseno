import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [usuario, setUsuario] = useState();
  const [idioma, setIdioma] = useState(null);
  const [tema, setTema] = useState(null);
  const [texto, setTexto] = useState(null);

  return (
    <AppContext.Provider
      value={{
        usuario,
        setUsuario,
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

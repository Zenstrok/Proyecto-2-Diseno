import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [idioma, setIdioma] = useState("es");
  const [tema, setTema] = useState("claro");
  const [texto, setTexto] = useState("mediano");
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider
      value={{
        idioma,
        setIdioma,
        tema,
        setTema,
        texto,
        setTexto,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

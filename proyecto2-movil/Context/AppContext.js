import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  return (
    <AppContext.Provider
      value={{
        usuario,
        setUsuario,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

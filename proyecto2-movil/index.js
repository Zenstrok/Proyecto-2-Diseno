import "setimmediate"; // Añade esta línea al inicio del archivo
import React from "react";
import { registerRootComponent } from "expo";
import App from "./App";
import { AppProvider } from "./Context/AppContext";

const Root = () => (
  <AppProvider>
    <App />
  </AppProvider>
);

registerRootComponent(Root);

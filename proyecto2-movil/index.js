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

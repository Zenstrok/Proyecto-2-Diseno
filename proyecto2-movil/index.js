import { registerRootComponent } from "expo";
import App from "./App";
import { AppProvider } from "./Context/AppContext"; // Importa el AppProvider

const Root = () => (
  <AppProvider>
    <App />
  </AppProvider>
);

registerRootComponent(Root);

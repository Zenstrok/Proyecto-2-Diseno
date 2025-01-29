import React, { useReducer } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native"; // Opcional: Control del color de la barra de estado
import LoginScreen from "./Screens/LoginScreen";
import HouseScreen from "./Screens/HouseScreen";
import RegisterScreen from "./Screens/RegisterScreen"; // Importa la pantalla de registro
import Configuracion from "./Screens/Configuracion"; // Importa la pantalla de configuración
import PlatosContinuados from "./Screens/PlatosContinuados"; // Importa la pantalla de platos continuados
import Cuenta from "./Screens/Cuenta"; // Importa la pantalla de cuenta
import Restaurants from "./Screens/Restaurants"; // Importa la pantalla de restaurantes
import { AppContext, initialState, reducer } from "./Context/AppContext"; // Importa el AppContext

const Stack = createStackNavigator();

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <NavigationContainer>
        {/* Barra de estado (opcional, puedes personalizar colores o estilos) */}
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

        {/* Navegador principal */}
        <Stack.Navigator
          initialRouteName="Login" // Ruta inicial, puede cambiar según el flujo
          screenOptions={{
            headerStyle: {
              backgroundColor: "#4CAF50", // Cambiar el color del encabezado
            },
            headerTintColor: "#fff", // Color del texto en el encabezado
            headerTitleStyle: {
              fontWeight: "bold", // Estilo de fuente
            },
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: "Inicio de Sesión" }} // Opcional: Título personalizado
          />
          <Stack.Screen
            name="House"
            component={HouseScreen}
            options={{ title: "Inicio" }} // Opcional: Título personalizado
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ title: "Registro" }} // Opcional: Título personalizado
          />
          <Stack.Screen
            name="Configuracion"
            component={Configuracion}
            options={{ title: "Configuración" }} // Opcional: Título personalizado
          />
          <Stack.Screen
            name="Restaurants"
            component={Restaurants}
            options={{ title: "Restaurantes" }} // Opcional: Título personalizado
          />
          <Stack.Screen
            name="PlatosContinuados"
            component={PlatosContinuados}
            options={{ title: "Platos Continuados" }} // Opcional: Título personalizado
          />
          <Stack.Screen
            name="Cuenta"
            component={Cuenta}
            options={{ title: "Cuenta" }} // Opcional: Título personalizado
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

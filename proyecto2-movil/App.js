import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native"; // Opcional: Control del color de la barra de estado
import LoginScreen from "./Screens/LoginScreen";
import HomeScreen from "./Screens/HomeScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
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
          name="Home"
          component={HomeScreen}
          options={{ title: "Inicio" }} // Opcional: Título personalizado
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

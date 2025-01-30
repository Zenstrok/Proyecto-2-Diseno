import React, { useReducer } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native";
import LoginScreen from "./Screens/LoginScreen";
import HouseScreen from "./Screens/HouseScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import Configuracion from "./Screens/Configuracion";
import PlatosContinuados from "./Screens/PlatosContinuados";
import Cuenta from "./Screens/Cuenta";
import Restaurants from "./Screens/Restaurants";
import RestaurantDetails from "./Screens/RestaurantDetails";
import RealizarPedido from "./Screens/RealizarPedido";
import OrderSummary from "./Screens/OrderSummary";
import { AppContext, initialState, reducer } from "./Context/AppContext";

const Stack = createStackNavigator();

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#4CAF50",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: "Inicio de Sesión" }}
          />
          <Stack.Screen
            name="House"
            component={HouseScreen}
            options={{ title: "Inicio" }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ title: "Registro" }}
          />
          <Stack.Screen
            name="Configuracion"
            component={Configuracion}
            options={{ title: "Configuración" }}
          />
          <Stack.Screen
            name="Restaurants"
            component={Restaurants}
            options={{ title: "Restaurantes" }}
          />
          <Stack.Screen
            name="PlatosContinuados"
            component={PlatosContinuados}
            options={{ title: "Platos Continuados" }}
          />
          <Stack.Screen
            name="Cuenta"
            component={Cuenta}
            options={{ title: "Cuenta" }}
          />
          <Stack.Screen
            name="RestaurantDetails"
            component={RestaurantDetails}
            options={{ title: "Detalles del Restaurante" }}
          />
          <Stack.Screen
            name="RealizarPedido"
            component={RealizarPedido}
            options={{ title: "Realizar Pedido" }}
          />
          <Stack.Screen
            name="OrderSummary"
            component={OrderSummary}
            options={{ title: "Resumen del Pedido" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

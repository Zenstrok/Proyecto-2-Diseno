import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { AppContext } from "../context/AppContext";

// Componentes de cada sección del menú
function HomeContent() {
  const { tema, idioma } = useContext(AppContext);

  return (
    <View
      style={tema === "claro" ? styles.lightContainer : styles.darkContainer}
    >
      <Text style={styles.headerText}>
        {idioma === "en" ? "Welcome to Home" : "Bienvenido a Inicio"}
      </Text>
    </View>
  );
}

function Cuenta() {
  return (
    <View style={styles.main}>
      <Text style={styles.headerText}>Cuenta</Text>
    </View>
  );
}

function Alergias() {
  return (
    <View style={styles.main}>
      <Text style={styles.headerText}>
        Alergias o Ingredientes Restringidos
      </Text>
    </View>
  );
}

function PlatosContinuados() {
  return (
    <View style={styles.main}>
      <Text style={styles.headerText}>Funcionalidad de Platos Continuados</Text>
    </View>
  );
}

function Mapa() {
  return (
    <View style={styles.main}>
      <Text style={styles.headerText}>Mapa</Text>
    </View>
  );
}

function Configuracion() {
  return (
    <View style={styles.main}>
      <Text style={styles.headerText}>Configuración</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function HomeScreen() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Inicio">
        <Drawer.Screen name="Inicio" component={HomeContent} />
        <Drawer.Screen name="Cuenta" component={Cuenta} />
        <Drawer.Screen name="Alergias" component={Alergias} />
        <Drawer.Screen
          name="Platos Continuados"
          component={PlatosContinuados}
        />
        <Drawer.Screen name="Mapa" component={Mapa} />
        <Drawer.Screen name="Configuración" component={Configuracion} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  lightContainer: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    alignItems: "center",
  },
  darkContainer: {
    flex: 1,
    backgroundColor: "#282c34",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f1593e",
    margin: 20,
    textAlign: "center",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
});

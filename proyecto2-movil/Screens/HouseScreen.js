import React, { useContext } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { AppContext } from "../Context/AppContext"; // Importa el AppContext

const HouseScreen = ({ navigation }) => {
  const { state } = useContext(AppContext); // Usa el contexto
  const { user, isAuthenticated, isDarkMode, isEnglish } = state;

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: isDarkMode ? "#333" : "#ffffff" },
      ]}
    >
      <Text
        style={[styles.headerText, { color: isDarkMode ? "#fff" : "#000" }]}
      >
        {isAuthenticated
          ? isEnglish
            ? `Welcome, ${user.name}`
            : `Bienvenido, ${user.name}`
          : isEnglish
          ? "Welcome Home"
          : "Bienvenido a Inicio"}
      </Text>

      <View style={styles.navigationButtons}>
        <Button
          title={isEnglish ? "Settings" : "Configuración"}
          onPress={() => navigation.navigate("Configuracion")}
        />
        <Button
          title={isEnglish ? "Map" : "Mapa"}
          onPress={() => navigation.navigate("Mapa")}
        />
        <Button
          title={isEnglish ? "Continued Dishes" : "Platos Continuados"}
          onPress={() => navigation.navigate("PlatosContinuados")}
        />
        <Button
          title={isEnglish ? "Account" : "Cuenta"}
          onPress={() => navigation.navigate("Cuenta")}
        />
      </View>

      <View style={styles.foodTypes}>
        <Text style={styles.foodTypeText}>
          {isEnglish ? "Vegan" : "Vegana"}
        </Text>
        <Text style={styles.foodTypeText}>
          {isEnglish ? "Vegetarian" : "Vegetariana"}
        </Text>
        <Text style={styles.foodTypeText}>{isEnglish ? "Meat" : "Carnes"}</Text>
        <Text style={styles.foodTypeText}>
          {isEnglish ? "Seafood" : "Mariscos"}
        </Text>
        <Text style={styles.foodTypeText}>
          {isEnglish ? "Desserts" : "Postres"}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  foodTypes: {
    alignItems: "center",
  },
  foodTypeText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
});

export default HouseScreen;

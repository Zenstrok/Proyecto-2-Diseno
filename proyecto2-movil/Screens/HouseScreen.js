import React, { useContext } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { AppContext } from "../Context/AppContext";

const HouseScreen = ({ navigation }) => {
  const { usuario, idioma, tema, texto } = useContext(AppContext);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: tema === "dark" ? "#333" : "#ffffff" },
      ]}
    >
      <Text
        style={[
          styles.headerText,
          {
            color: tema === "dark" ? "#fff" : "#000",
            fontSize: texto === "sm" ? 20 : texto === "md" ? 24 : 28,
          },
        ]}
      >
        {`${idioma === "es" ? "Bienvenido" : "Welcome"}, ${usuario?.nombre}`}
      </Text>

      <View style={styles.navigationButtons}>
        <Button
          title={idioma === "es" ? "Configuración" : "Settings"}
          onPress={() => navigation.navigate("Configuracion")}
        />
        <Button
          title={idioma === "es" ? "Restaurantes" : "Restaurants"}
          onPress={() => navigation.navigate("Restaurants")}
        />
        <Button
          title={idioma === "es" ? "Platos Continuados" : "Continued Dishes"}
          onPress={() => navigation.navigate("PlatosContinuados")}
        />
        <Button
          title={idioma === "es" ? "Cuenta" : "Account"}
          onPress={() => navigation.navigate("Cuenta")}
        />
      </View>

      <View style={styles.foodTypes}>
        <Text
          style={[
            styles.foodTypeText,
            {
              color: tema === "dark" ? "#fff" : "#000",
              fontSize: texto === "sm" ? 16 : texto === "md" ? 18 : 20,
            },
          ]}
        >
          {"Vegana"}
        </Text>
        <Text
          style={[
            styles.foodTypeText,
            {
              color: tema === "dark" ? "#fff" : "#000",
              fontSize: texto === "sm" ? 16 : texto === "md" ? 18 : 20,
            },
          ]}
        >
          {"Vegetariana"}
        </Text>
        <Text
          style={[
            styles.foodTypeText,
            {
              color: tema === "dark" ? "#fff" : "#000",
              fontSize: texto === "sm" ? 16 : texto === "md" ? 18 : 20,
            },
          ]}
        >
          {"Carnes"}
        </Text>
        <Text
          style={[
            styles.foodTypeText,
            {
              color: tema === "dark" ? "#fff" : "#000",
              fontSize: texto === "sm" ? 16 : texto === "md" ? 18 : 20,
            },
          ]}
        >
          {"Mariscos"}
        </Text>
        <Text
          style={[
            styles.foodTypeText,
            {
              color: tema === "dark" ? "#fff" : "#000",
              fontSize: texto === "sm" ? 16 : texto === "md" ? 18 : 20,
            },
          ]}
        >
          {"Postres"}
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
    fontWeight: "bold",
    marginVertical: 10,
  },
});

export default HouseScreen;

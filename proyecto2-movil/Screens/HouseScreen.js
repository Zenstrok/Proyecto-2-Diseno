import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
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
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: tema === "dark" ? "#555" : "#ddd" },
          ]}
          onPress={() => navigation.navigate("Configuracion")}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: tema === "dark" ? "#fff" : "#000",
                fontSize: texto === "sm" ? 14 : texto === "md" ? 16 : 18,
              },
            ]}
          >
            {idioma === "es" ? "Configuración" : "Settings"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: tema === "dark" ? "#555" : "#ddd" },
          ]}
          onPress={() => navigation.navigate("Restaurants")}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: tema === "dark" ? "#fff" : "#000",
                fontSize: texto === "sm" ? 14 : texto === "md" ? 16 : 18,
              },
            ]}
          >
            {idioma === "es" ? "Restaurantes" : "Restaurants"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: tema === "dark" ? "#555" : "#ddd" },
          ]}
          onPress={() => navigation.navigate("PlatosContinuados")}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: tema === "dark" ? "#fff" : "#000",
                fontSize: texto === "sm" ? 14 : texto === "md" ? 16 : 18,
              },
            ]}
          >
            {idioma === "es" ? "Platos Continuados" : "Continued Dishes"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: tema === "dark" ? "#555" : "#ddd" },
          ]}
          onPress={() => navigation.navigate("Cuenta")}
        >
          <Text
            style={[
              styles.buttonText,
              {
                color: tema === "dark" ? "#fff" : "#000",
                fontSize: texto === "sm" ? 14 : texto === "md" ? 16 : 18,
              },
            ]}
          >
            {idioma === "es" ? "Cuenta" : "Account"}
          </Text>
        </TouchableOpacity>
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
    marginBottom: 40,
    textAlign: "center",
  },
  navigationButtons: {
    width: "100%",
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
  },
});

export default HouseScreen;

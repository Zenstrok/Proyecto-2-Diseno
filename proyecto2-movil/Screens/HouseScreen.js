import React, { useContext } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import { AppContext } from "../Context/AppContext";

const HouseScreen = ({ navigation }) => {
  const { usuario } = useContext(AppContext);
  console.log(usuario);

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: "#ffffff" }]}
    >
      <Text style={[styles.headerText, { color: "#000" }]}>
        {`Bienvenido, ${usuario.nombre}`}
      </Text>

      <View style={styles.navigationButtons}>
        <Button
          title={"Configuración"}
          onPress={() => navigation.navigate("Configuracion")}
        />
        <Button
          title={"Restaurantes"}
          onPress={() => navigation.navigate("Restaurants")}
        />
        <Button
          title={"Platos Continuados"}
          onPress={() => navigation.navigate("PlatosContinuados")}
        />
        <Button
          title={"Cuenta"}
          onPress={() => navigation.navigate("Cuenta")}
        />
      </View>

      <View style={styles.foodTypes}>
        <Text style={styles.foodTypeText}>{"Vegana"}</Text>
        <Text style={styles.foodTypeText}>{"Vegetariana"}</Text>
        <Text style={styles.foodTypeText}>{"Carnes"}</Text>
        <Text style={styles.foodTypeText}>{"Mariscos"}</Text>
        <Text style={styles.foodTypeText}>{"Postres"}</Text>
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

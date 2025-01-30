import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const RestaurantDetails = ({ route, navigation }) => {
  const { restaurant } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{restaurant.name}</Text>
      <Text style={styles.description}>{restaurant.description}</Text>
      <Text style={styles.address}>{restaurant.address}</Text>
      <Text style={styles.phone}>{restaurant.phone}</Text>
      <Button
        title="Realizar Pedido"
        onPress={() =>
          navigation.navigate("RealizarPedido", {
            restaurant,
            dishName: "Nombre del Plato", // Asegúrate de pasar el nombre del plato
            basePrice: 10, // Asegúrate de pasar el precio base
            baseIngredients: ["Ingrediente 1", "Ingrediente 2"], // Asegúrate de pasar los ingredientes base
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  address: {
    fontSize: 16,
    marginBottom: 8,
  },
  phone: {
    fontSize: 16,
    marginBottom: 16,
  },
});

export default RestaurantDetails;

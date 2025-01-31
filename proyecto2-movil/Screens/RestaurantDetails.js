import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { AppContext } from "../Context/AppContext";

const RestaurantDetails = ({ route, navigation }) => {
  const { idioma, tema, texto } = useContext(AppContext);
  const { restaurant } = route.params;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: tema === "dark" ? "#333" : "#fff" },
      ]}
    >
      <Text
        style={[
          styles.name,
          {
            color: tema === "dark" ? "#fff" : "#000",
            fontSize: texto === "sm" ? 20 : texto === "md" ? 24 : 28,
          },
        ]}
      >
        {restaurant.name}
      </Text>
      <Text
        style={[
          styles.description,
          {
            color: tema === "dark" ? "#ccc" : "#666",
            fontSize: texto === "sm" ? 14 : texto === "md" ? 16 : 18,
          },
        ]}
      >
        {restaurant.description}
      </Text>
      <Text
        style={[
          styles.address,
          {
            color: tema === "dark" ? "#ccc" : "#666",
            fontSize: texto === "sm" ? 14 : texto === "md" ? 16 : 18,
          },
        ]}
      >
        {restaurant.address}
      </Text>
      <Text
        style={[
          styles.phone,
          {
            color: tema === "dark" ? "#ccc" : "#666",
            fontSize: texto === "sm" ? 14 : texto === "md" ? 16 : 18,
          },
        ]}
      >
        {restaurant.phone}
      </Text>
      <Text
        style={[
          styles.cuisine,
          {
            color: tema === "dark" ? "#ccc" : "#666",
            fontSize: texto === "sm" ? 14 : texto === "md" ? 16 : 18,
          },
        ]}
      >
        {restaurant.cuisine.join(", ")}
      </Text>
      <Text
        style={[
          styles.deliveryTime,
          {
            color: tema === "dark" ? "#ccc" : "#666",
            fontSize: texto === "sm" ? 14 : texto === "md" ? 16 : 18,
          },
        ]}
      >
        {idioma === "es" ? "Tiempo de entrega" : "Delivery time"}:{" "}
        {restaurant.deliveryTime}
      </Text>
      <Text
        style={[
          styles.compatibility,
          {
            color: tema === "dark" ? "#ccc" : "#666",
            fontSize: texto === "sm" ? 14 : texto === "md" ? 16 : 18,
          },
        ]}
      >
        {idioma === "es" ? "Compatibilidad" : "Compatibility"}:{" "}
        {restaurant.compatibility}%
      </Text>
      <Button
        title={idioma === "es" ? "Realizar Pedido" : "Place Order"}
        onPress={() =>
          navigation.navigate("RealizarPedido", {
            restaurant,
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
  },
  name: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    marginBottom: 8,
  },
  address: {
    marginBottom: 8,
  },
  phone: {
    marginBottom: 8,
  },
  cuisine: {
    marginBottom: 8,
  },
  deliveryTime: {
    marginBottom: 8,
  },
  compatibility: {
    marginBottom: 16,
  },
});

export default RestaurantDetails;

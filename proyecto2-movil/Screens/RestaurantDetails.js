import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AppContext } from "../Context/AppContext";

const RestaurantDetails = ({ route, navigation }) => {
  const { idioma, tema, texto } = useContext(AppContext);
  const { restaurant } = route.params;

  // Función para obtener estilos dinámicos
  const getDynamicStyles = (type) => {
    const baseStyles = {
      color: tema === "dark" ? "#ccc" : "#666",
      fontSize: texto === "sm" ? 14 : texto === "md" ? 16 : 18,
    };

    if (type === "title") {
      return {
        ...baseStyles,
        color: tema === "dark" ? "#fff" : "#000",
        fontSize: texto === "sm" ? 20 : texto === "md" ? 24 : 28,
        fontWeight: "bold",
      };
    }

    return baseStyles;
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: tema === "dark" ? "#333" : "#fff" },
      ]}
    >
      {/* Nombre del restaurante */}
      <Text style={[styles.name, getDynamicStyles("title")]}>
        {restaurant.name}
      </Text>

      {/* Descripción del restaurante */}
      <Text style={[styles.description, getDynamicStyles()]}>
        {restaurant.description}
      </Text>

      {/* Dirección del restaurante */}
      <Text style={[styles.address, getDynamicStyles()]}>
        {restaurant.address}
      </Text>

      {/* Teléfono del restaurante */}
      <Text style={[styles.phone, getDynamicStyles()]}>{restaurant.phone}</Text>

      {/* Tipo de cocina */}
      <Text style={[styles.cuisine, getDynamicStyles()]}>
        {restaurant.cuisine.join(", ")}
      </Text>

      {/* Tiempo de entrega */}
      <Text style={[styles.deliveryTime, getDynamicStyles()]}>
        {idioma === "es" ? "Tiempo de entrega" : "Delivery time"}:{" "}
        {restaurant.deliveryTime}
      </Text>

      {/* Compatibilidad */}
      <Text style={[styles.compatibility, getDynamicStyles()]}>
        {idioma === "es" ? "Compatibilidad" : "Compatibility"}:{" "}
        {restaurant.compatibility}%
      </Text>

      {/* Botón para realizar pedido */}
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: tema === "dark" ? "#555" : "#ddd" },
        ]}
        onPress={() =>
          navigation.navigate("RealizarPedido", {
            restaurant,
          })
        }
      >
        <Text
          style={[
            styles.buttonText,
            { color: tema === "dark" ? "#fff" : "#000" },
          ]}
        >
          {idioma === "es" ? "Realizar Pedido" : "Place Order"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  name: {
    marginBottom: 16,
  },
  description: {
    marginBottom: 12,
  },
  address: {
    marginBottom: 12,
  },
  phone: {
    marginBottom: 12,
  },
  cuisine: {
    marginBottom: 12,
  },
  deliveryTime: {
    marginBottom: 12,
  },
  compatibility: {
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default RestaurantDetails;

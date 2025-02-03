import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { AppContext } from "../Context/AppContext";
import { supabase } from "../services/supabase";

const RestaurantDetails = ({ route, navigation }) => {
  const { idioma, tema, texto } = useContext(AppContext);
  const { restaurantId } = route.params; // Cambiamos para recibir el ID del restaurante
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para obtener los detalles del restaurante desde Supabase
  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const { data, error } = await supabase
          .from("cocinas")
          .select("*")
          .eq("id", restaurantId)
          .single();

        if (error) {
          console.error("Error fetching restaurant details:", error);
          return;
        }

        // Mapear los datos para que coincidan con la estructura esperada
        const formattedRestaurant = {
          id: data.id,
          name: data.nombre,
          description: data.descripcion || "Sin descripción",
          address: data.direccion_exacta,
          phone: data.telefono,
          cuisine: data.tipos_cocina || ["Sin tipo"],
          deliveryTime: `${data.tiempo_entrega} min`,
          compatibility: Math.floor(Math.random() * 100), // Esto puede ser reemplazado por un cálculo real
        };

        setRestaurant(formattedRestaurant);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [restaurantId]);

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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!restaurant) {
    return (
      <View style={styles.container}>
        <Text style={getDynamicStyles()}>
          {idioma === "es"
            ? "Restaurante no encontrado"
            : "Restaurant not found"}
        </Text>
      </View>
    );
  }

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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RestaurantDetails;

import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AppContext } from "../Context/AppContext";

export default function Restaurants({ navigation }) {
  const { idioma, tema, texto } = useContext(AppContext);
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState([]);

  const mockRestaurants = [
    {
      id: 1,
      name: "El Marisquero",
      location: "Calle del Mar, 123",
      cuisine: ["Mariscos", "Pescatariana"],
      status: "Abierto",
      deliveryTime: "30 min",
      compatibility: 85,
    },
    {
      id: 2,
      name: "La Carnicería",
      location: "Avenida de la Carne, 456",
      cuisine: ["Carnes", "Keto", "Paleo"],
      status: "Cerrado",
      deliveryTime: "45 min",
      compatibility: 70,
    },
    {
      id: 3,
      name: "Verde Vida",
      location: "Plaza Verde, 789",
      cuisine: ["Vegetariana", "Vegana", "Sin gluten", "Sin lactosa"],
      status: "Abierto",
      deliveryTime: "25 min",
      compatibility: 90,
    },
    {
      id: 4,
      name: "Low Carb Delight",
      location: "Calle Baja, 101",
      cuisine: ["Low Carb", "Keto"],
      status: "Abierto",
      deliveryTime: "35 min",
      compatibility: 80,
    },
    {
      id: 5,
      name: "Paleo Place",
      location: "Avenida Natural, 202",
      cuisine: ["Paleo", "Sin gluten"],
      status: "Cerrado",
      deliveryTime: "50 min",
      compatibility: 65,
    },
  ];

  useEffect(() => {
    setRestaurants(mockRestaurants);
    setFilteredRestaurants(mockRestaurants);
  }, []);

  const filterByCuisine = (cuisine) => {
    if (selectedCuisines.includes(cuisine)) {
      setSelectedCuisines(selectedCuisines.filter((c) => c !== cuisine));
    } else {
      setSelectedCuisines([...selectedCuisines, cuisine]);
    }
  };

  useEffect(() => {
    if (selectedCuisines.length > 0) {
      const filtered = restaurants.filter((restaurant) =>
        restaurant.cuisine.some((c) => selectedCuisines.includes(c))
      );
      setFilteredRestaurants(filtered);
    } else {
      setFilteredRestaurants(restaurants);
    }
  }, [selectedCuisines, restaurants]);

  const getCompatibilityColor = (compatibility) => {
    if (compatibility > 75) return "green";
    if (compatibility >= 50) return "orange";
    return "red";
  };

  const renderRestaurantCard = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("RestaurantDetails", { restaurant: item })
      }
    >
      <View
        style={[
          styles.card,
          { backgroundColor: tema === "dark" ? "#444" : "#fff" },
        ]}
      >
        <Text
          style={[
            styles.restaurantName,
            {
              color: tema === "dark" ? "#fff" : "#000",
              fontSize: texto === "sm" ? 16 : texto === "md" ? 18 : 20,
            },
          ]}
        >
          {item.name}
        </Text>
        <Text
          style={{
            color: tema === "dark" ? "#ccc" : "#666",
            fontSize: texto === "sm" ? 12 : texto === "md" ? 14 : 16,
          }}
        >
          {item.location}
        </Text>
        <Text
          style={{
            color: tema === "dark" ? "#ccc" : "#666",
            fontSize: texto === "sm" ? 12 : texto === "md" ? 14 : 16,
          }}
        >
          {item.cuisine.join(", ")}
        </Text>
        <View style={styles.statusContainer}>
          <Text
            style={{
              color: item.status === "Abierto" ? "green" : "red",
              fontSize: texto === "sm" ? 12 : texto === "md" ? 14 : 16,
            }}
          >
            {item.status}
          </Text>
          <Text
            style={{
              color: tema === "dark" ? "#ccc" : "#666",
              fontSize: texto === "sm" ? 12 : texto === "md" ? 14 : 16,
            }}
          >
            {idioma === "es" ? "Tiempo de entrega" : "Delivery time"}:{" "}
            {item.deliveryTime}
          </Text>
        </View>
        <View style={styles.compatibilityContainer}>
          <Text
            style={{
              color: tema === "dark" ? "#ccc" : "#666",
              fontSize: texto === "sm" ? 12 : texto === "md" ? 14 : 16,
            }}
          >
            {idioma === "es" ? "Compatibilidad" : "Compatibility"}:
          </Text>
          <Text
            style={{
              color: getCompatibilityColor(item.compatibility),
              fontWeight: "bold",
              fontSize: texto === "sm" ? 12 : texto === "md" ? 14 : 16,
            }}
          >
            {item.compatibility}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        styles.main,
        { backgroundColor: tema === "dark" ? "#333" : "#f9f9f9" },
      ]}
    >
      <Text
        style={[
          styles.headerText,
          {
            color: tema === "dark" ? "#fff" : "#f1593e",
            fontSize: texto === "sm" ? 20 : texto === "md" ? 24 : 28,
          },
        ]}
      >
        {idioma === "es" ? "Restaurantes" : "Restaurants"}
      </Text>

      <ScrollView horizontal style={styles.filtersContainer}>
        {[
          "Mariscos",
          "Carnes",
          "Vegetariana",
          "Vegana",
          "Sin gluten",
          "Sin lactosa",
          "Pescatariana",
          "Keto",
          "Paleo",
          "Low Carb",
        ].map((cuisine) => (
          <TouchableOpacity
            key={cuisine}
            style={[
              styles.filterButton,
              {
                backgroundColor: selectedCuisines.includes(cuisine)
                  ? "#f1593e"
                  : tema === "dark"
                  ? "#555"
                  : "#ddd",
              },
            ]}
            onPress={() => filterByCuisine(cuisine)}
          >
            <Text
              style={{
                color: selectedCuisines.includes(cuisine)
                  ? "#fff"
                  : tema === "dark"
                  ? "#fff"
                  : "#000",
                fontSize: texto === "sm" ? 12 : texto === "md" ? 14 : 16,
              }}
            >
              {cuisine}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredRestaurants}
        renderItem={renderRestaurantCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 16,
  },
  headerText: {
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  filtersContainer: {
    marginBottom: 20,
  },
  filterButton: {
    padding: 10,
    marginRight: 10,
    borderRadius: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  restaurantName: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  compatibilityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
});

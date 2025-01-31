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
  // Añade navigation como prop
  /* const { state } = useContext(AppContext);
  const { isDarkMode, isEnglish } = state;

  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState([]);

  const mockRestaurants = [
    {
      id: 1,
      name: "La Pizzeria",
      location: "San José, Escazú",
      cuisine: ["Italiana", "Pizza"],
      status: "Abierto",
      deliveryTime: "20-30 min",
      compatibility: 85,
      description: "Delicious Italian pizza with fresh ingredients.",
      address: "123 Pizza St, San José, Escazú",
      phone: "123-456-7890",
    },
    {
      id: 2,
      name: "Sushi Palace",
      location: "San José, Santa Ana",
      cuisine: ["Japonesa", "Sushi"],
      status: "Cerrado",
      deliveryTime: "40-50 min",
      compatibility: 60,
      description: "Authentic Japanese sushi with a modern twist.",
      address: "456 Sushi Ave, San José, Santa Ana",
      phone: "098-765-4321",
    },
    {
      id: 3,
      name: "Green Bites",
      location: "Heredia, Heredia Centro",
      cuisine: ["Vegana", "Vegetariana"],
      status: "Abierto",
      deliveryTime: "15-25 min",
      compatibility: 95,
      description: "Healthy vegan and vegetarian meals.",
      address: "789 Green Rd, Heredia, Heredia Centro",
      phone: "555-555-5555",
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
      } // Navega a RestaurantDetails
    >
      <View
        style={[styles.card, { backgroundColor: isDarkMode ? "#444" : "#fff" }]}
      >
        <Text
          style={[
            styles.restaurantName,
            { color: isDarkMode ? "#fff" : "#000" },
          ]}
        >
          {item.name}
        </Text>
        <Text style={{ color: isDarkMode ? "#ccc" : "#666" }}>
          {item.location}
        </Text>
        <Text style={{ color: isDarkMode ? "#ccc" : "#666" }}>
          {item.cuisine.join(", ")}
        </Text>
        <View style={styles.statusContainer}>
          <Text style={{ color: item.status === "Abierto" ? "green" : "red" }}>
            {item.status}
          </Text>
          <Text style={{ color: isDarkMode ? "#ccc" : "#666" }}>
            Tiempo de entrega: {item.deliveryTime}
          </Text>
        </View>
        <View style={styles.compatibilityContainer}>
          <Text style={{ color: isDarkMode ? "#ccc" : "#666" }}>
            Compatibilidad:
          </Text>
          <Text
            style={{
              color: getCompatibilityColor(item.compatibility),
              fontWeight: "bold",
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
        { backgroundColor: isDarkMode ? "#333" : "#f9f9f9" },
      ]}
    >
      <Text
        style={[styles.headerText, { color: isDarkMode ? "#fff" : "#f1593e" }]}
      >
        {isEnglish ? "Restaurants" : "Restaurantes"}
      </Text>

      <ScrollView horizontal style={styles.filtersContainer}>
        {[
          "Vegana",
          "Vegetariana",
          "Italiana",
          "Japonesa",
          "Pizza",
          "Sushi",
        ].map((cuisine) => (
          <TouchableOpacity
            key={cuisine}
            style={[
              styles.filterButton,
              {
                backgroundColor: selectedCuisines.includes(cuisine)
                  ? "#f1593e"
                  : isDarkMode
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
                  : isDarkMode
                  ? "#fff"
                  : "#000",
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
  ); */
  return (
    <View style={styles.main}>
      <Text>Hola</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 16,
  },
  headerText: {
    fontSize: 24,
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
    fontSize: 18,
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

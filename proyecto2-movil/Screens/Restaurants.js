import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { AppContext } from "../Context/AppContext";
import { supabase } from "../services/supabase";

export default function Restaurants({ navigation }) {
  const { idioma, tema, texto } = useContext(AppContext);
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [cuisineTypes, setCuisineTypes] = useState([]); // Nuevo estado para los tipos de cocina
  const [loading, setLoading] = useState(true);

  // Obtener los restaurantes y los tipos de cocina desde Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener los tipos de cocina desde la tabla TiposCocinas
        const { data: cuisineData, error: cuisineError } = await supabase
          .from("tiposcocinas") // Nombre de la tabla corregido
          .select("*");

        if (cuisineError) {
          console.error("Error fetching cuisine types:", cuisineError);
          return;
        }

        // Guardar los nombres de los tipos de cocina
        setCuisineTypes(cuisineData.map((cuisine) => cuisine.nombre)); // Asume que el nombre del tipo de cocina está en el campo "nombre"

        // Obtener los restaurantes desde la tabla Cocinas con un JOIN a la tabla CocinaYTipo y TiposCocinas
        const { data: restaurantData, error: restaurantError } =
          await supabase.from("cocinas").select(`
              id,
              nombre,
              direccion_exacta,
              estado,
              tiempo_entrega,
              metodos_pago,
              CocinaYTipo ( TiposCocinas ( nombre ) )
            `);

        if (restaurantError) {
          console.error("Error fetching restaurants:", restaurantError);
          return;
        }

        // Mapear los datos para que coincidan con la estructura esperada
        const formattedRestaurants = restaurantData.map((restaurant) => ({
          id: restaurant.id,
          name: restaurant.nombre,
          location: restaurant.direccion_exacta,
          cuisine: restaurant.CocinaYTipo.map((tc) => tc.TiposCocinas.nombre), // Ajustado para usar TiposCocinas
          status: restaurant.estado ? "Abierto" : "Cerrado",
          deliveryTime: `${restaurant.tiempo_entrega} min`,
          compatibility: Math.floor(Math.random() * 100), // Esto puede ser reemplazado por un cálculo real
        }));

        setRestaurants(formattedRestaurants);
        setFilteredRestaurants(formattedRestaurants);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtrar restaurantes por tipo de cocina
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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
        {cuisineTypes.map((cuisine) => (
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

const HomeScreen = () => {
  // Ejemplo de datos ficticios para mostrar categorías de restaurantes
  const categories = [
    {
      id: "1",
      name: "Comida Rápida",
      image: "https://via.placeholder.com/150",
    },
    { id: "2", name: "Italiana", image: "https://via.placeholder.com/150" },
    { id: "3", name: "Sushi", image: "https://via.placeholder.com/150" },
    { id: "4", name: "Mexicana", image: "https://via.placeholder.com/150" },
  ];

  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Explora Categorías</Text>

      {/* Lista de Categorías */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  list: {
    justifyContent: "center",
  },
  card: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    margin: 10,
    alignItems: "center",
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default HomeScreen;

import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AppContext } from "../Context/AppContext";

const RealizarPedido = ({ route, navigation }) => {
  const { idioma, tema, texto } = useContext(AppContext);
  const { restaurant } = route.params;
  const [selectedItems, setSelectedItems] = useState([]);

  // Menú mock - En un caso real esto vendría de una API
  const menuMock = [
    {
      id: 1,
      name: "Plato 1",
      price: 15.99,
      description: "Descripción del plato 1",
    },
    {
      id: 2,
      name: "Plato 2",
      price: 12.99,
      description: "Descripción del plato 2",
    },
    {
      id: 3,
      name: "Plato 3",
      price: 18.99,
      description: "Descripción del plato 3",
    },
  ];

  const handleSelectItem = (item) => {
    setSelectedItems([...selectedItems, item]);
  };

  const handlePlaceOrder = () => {
    if (selectedItems.length === 0) {
      Alert.alert(
        idioma === "es" ? "Error" : "Error",
        idioma === "es"
          ? "Por favor selecciona al menos un plato"
          : "Please select at least one dish"
      );
      return;
    }

    const orderDetails = {
      restaurant: restaurant,
      items: selectedItems,
      total: selectedItems.reduce((acc, item) => acc + item.price, 0),
    };

    navigation.navigate("OrderSummary", orderDetails);
  };

  const styles = getStyles(tema, texto);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{restaurant.name}</Text>

      <Text style={styles.sectionTitle}>
        {idioma === "es" ? "Menú Disponible" : "Available Menu"}
      </Text>

      {menuMock.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.menuItem}
          onPress={() => handleSelectItem(item)}
        >
          <View>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <Text style={styles.itemPrice}>${item.price}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <View style={styles.selectedItemsContainer}>
        <Text style={styles.sectionTitle}>
          {idioma === "es" ? "Items Seleccionados" : "Selected Items"}
        </Text>
        {selectedItems.map((item, index) => (
          <Text key={index} style={styles.selectedItem}>
            {item.name} - ${item.price}
          </Text>
        ))}
        {selectedItems.length > 0 && (
          <Text style={styles.total}>
            Total: $
            {selectedItems
              .reduce((acc, item) => acc + item.price, 0)
              .toFixed(2)}
          </Text>
        )}
      </View>

      <Button
        title={idioma === "es" ? "Realizar Pedido" : "Place Order"}
        onPress={handlePlaceOrder}
      />
    </ScrollView>
  );
};

const getStyles = (tema, texto) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: tema === "dark" ? "#333" : "#fff",
    },
    title: {
      fontSize: texto === "sm" ? 20 : texto === "md" ? 24 : 28,
      fontWeight: "bold",
      marginBottom: 16,
      color: tema === "dark" ? "#fff" : "#000",
    },
    sectionTitle: {
      fontSize: texto === "sm" ? 16 : texto === "md" ? 18 : 20,
      fontWeight: "bold",
      marginTop: 16,
      marginBottom: 8,
      color: tema === "dark" ? "#fff" : "#000",
    },
    menuItem: {
      padding: 12,
      borderRadius: 8,
      backgroundColor: tema === "dark" ? "#444" : "#f5f5f5",
      marginBottom: 8,
    },
    itemName: {
      fontSize: texto === "sm" ? 14 : texto === "md" ? 16 : 18,
      fontWeight: "bold",
      color: tema === "dark" ? "#fff" : "#000",
    },
    itemDescription: {
      fontSize: texto === "sm" ? 12 : texto === "md" ? 14 : 16,
      color: tema === "dark" ? "#ccc" : "#666",
      marginTop: 4,
    },
    itemPrice: {
      fontSize: texto === "sm" ? 14 : texto === "md" ? 16 : 18,
      color: tema === "dark" ? "#fff" : "#000",
      marginTop: 4,
    },
    selectedItemsContainer: {
      marginTop: 20,
      marginBottom: 20,
    },
    selectedItem: {
      fontSize: texto === "sm" ? 14 : texto === "md" ? 16 : 18,
      color: tema === "dark" ? "#fff" : "#000",
      marginBottom: 4,
    },
    total: {
      fontSize: texto === "sm" ? 16 : texto === "md" ? 18 : 20,
      fontWeight: "bold",
      color: tema === "dark" ? "#fff" : "#000",
      marginTop: 8,
    },
  });

export default RealizarPedido;

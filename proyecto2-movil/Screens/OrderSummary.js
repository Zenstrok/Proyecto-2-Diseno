import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  Alert,
} from "react-native";

const OrderSummary = ({ route, navigation }) => {
  const { restaurant, items, total } = route.params;

  const handleConfirmOrder = () => {
    Alert.alert(
      "Pedido Confirmado",
      "Tu pedido ha sido confirmado y está siendo procesado.",
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("Home"), // Redirige a la pantalla principal o a donde desees
        },
      ]
    );
  };

  const handleGoBackToEdit = () => {
    // Navegar a RestaurantDetails y pasar el restaurante para poder editar el pedido
    navigation.navigate("RestaurantDetails", { restaurant });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: "#fff",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 16,
      color: "#000",
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 16,
      marginBottom: 8,
      color: "#000",
    },
    itemContainer: {
      marginBottom: 12,
    },
    itemName: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#000",
    },
    itemDescription: {
      fontSize: 14,
      color: "#666",
      marginTop: 4,
    },
    itemPrice: {
      fontSize: 16,
      color: "#000",
      marginTop: 4,
    },
    customizationText: {
      fontSize: 14,
      color: "#666",
      marginBottom: 4,
    },
    total: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#000",
      marginTop: 16,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Resumen del Pedido</Text>
      <Text style={styles.sectionTitle}>Restaurante: {restaurant.name}</Text>

      <Text style={styles.sectionTitle}>Items Pedidos:</Text>
      {items.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.itemName}>
            {item.name} - ${item.price}
          </Text>
          {item.preparation && (
            <Text style={styles.customizationText}>
              Preparación: {item.preparation}
            </Text>
          )}
          {item.extraIngredients && (
            <Text style={styles.customizationText}>
              Ingredientes extra: {item.extraIngredients}
            </Text>
          )}
        </View>
      ))}

      <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Volver Atrás" onPress={handleGoBackToEdit} />
        <Button title="Confirmar Pedido" onPress={handleConfirmOrder} />
      </View>
    </ScrollView>
  );
};

export default OrderSummary;

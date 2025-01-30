import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const OrderSummary = ({ route, navigation }) => {
  const { customOrder } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen del Pedido</Text>

      <Text style={styles.sectionTitle}>{customOrder.dishName}</Text>

      <Text style={styles.sectionTitle}>Ingredientes Seleccionados:</Text>
      {customOrder.selectedIngredients.map((ingredient, index) => (
        <Text key={index}>{ingredient}</Text>
      ))}

      <Text style={styles.sectionTitle}>Ingredientes Extra:</Text>
      {customOrder.extraIngredients.map((ingredient, index) => (
        <Text key={index}>{ingredient}</Text>
      ))}

      <Text style={styles.sectionTitle}>Ingredientes Eliminados:</Text>
      {customOrder.removedIngredients.map((ingredient, index) => (
        <Text key={index}>{ingredient}</Text>
      ))}

      <Text style={styles.sectionTitle}>Indicaciones Especiales:</Text>
      <Text>{customOrder.specialInstructions}</Text>

      <Text style={styles.sectionTitle}>Tipo de Pedido:</Text>
      <Text>{customOrder.orderType}</Text>

      {customOrder.orderType === "continuado" && (
        <View>
          <Text style={styles.sectionTitle}>Días Seleccionados:</Text>
          {customOrder.selectedDays.map((day, index) => (
            <Text key={index}>{day}</Text>
          ))}
        </View>
      )}

      <Text style={styles.sectionTitle}>Precio Total:</Text>
      <Text>${customOrder.totalPrice}</Text>

      <Button
        title="Confirmar Pedido"
        onPress={() => navigation.navigate("Home")}
      />
      <Button title="Editar Pedido" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
});

export default OrderSummary;

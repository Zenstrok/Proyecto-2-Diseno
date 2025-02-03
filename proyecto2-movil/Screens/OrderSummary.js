import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import { supabase } from "../services/supabase";
import { AppContext } from "../Context/AppContext";

const OrderSummary = ({ route, navigation }) => {
  const { idioma, tema } = useContext(AppContext);
  const { restaurant, items, total, isRecurring, selectedDays, selectedTime } =
    route.params;

  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmOrder = async () => {
    setIsLoading(true);
    try {
      // Obtener el ID del usuario actual
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) throw userError;
      const usuarioId = user.id;

      // Preparar los pedidos
      const pedidosInsertar = items.map((item) => ({
        idusuario: usuarioId,
        idplatobase: item.id,
        instruccionesespeciales: item.preparation || "",
        instruccionesingredientes: item.extraIngredients
          ? item.extraIngredients.map((ing) => ing.nombre).join(", ")
          : "",
        estado: "recibido",
        prioridad: "normal",
        continuado: isRecurring || false,
        horapedido: new Date().toISOString(),
      }));

      // Insertar pedidos
      const { data: pedidosData, error: pedidosError } = await supabase
        .from("pedidos")
        .insert(pedidosInsertar)
        .select();

      if (pedidosError) throw pedidosError;

      // Insertar ingredientes de pedido si existen
      const ingredientesPedido = pedidosData.flatMap((pedido, index) =>
        items[index].extraIngredients
          ? items[index].extraIngredients.map((ing) => ({
              idpedido: pedido.id,
              idingrediente: ing.id,
            }))
          : []
      );

      if (ingredientesPedido.length > 0) {
        const { error: ingredientesError } = await supabase
          .from("ingredientes_pedido")
          .insert(ingredientesPedido);

        if (ingredientesError) throw ingredientesError;
      }

      // Alerta de éxito y navegación a HouseScreen
      Alert.alert(
        idioma === "es" ? "Pedido Confirmado" : "Order Confirmed",
        idioma === "es"
          ? "Tu pedido ha sido procesado exitosamente."
          : "Your order has been processed successfully.",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("HouseScreen"),
          },
        ]
      );
    } catch (error) {
      console.error("Error confirmando pedido:", error);
      Alert.alert(
        idioma === "es" ? "Error" : "Error",
        idioma === "es"
          ? "Hubo un problema al procesar tu pedido."
          : "There was an issue processing your order."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBackToEdit = () => {
    navigation.navigate("RealizarPedido", { restaurant });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: tema === "dark" ? "#333" : "#fff",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 16,
      color: tema === "dark" ? "#fff" : "#000",
      textAlign: "center",
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 16,
      marginBottom: 8,
      color: tema === "dark" ? "#fff" : "#000",
    },
    itemContainer: {
      marginBottom: 12,
      padding: 12,
      borderRadius: 8,
      backgroundColor: tema === "dark" ? "#444" : "#f5f5f5",
    },
    itemName: {
      fontSize: 16,
      fontWeight: "bold",
      color: tema === "dark" ? "#fff" : "#000",
    },
    itemDetails: {
      fontSize: 14,
      color: tema === "dark" ? "#ccc" : "#666",
      marginTop: 4,
    },
    total: {
      fontSize: 20,
      fontWeight: "bold",
      color: tema === "dark" ? "#fff" : "#000",
      textAlign: "right",
      marginTop: 16,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
    },
    button: {
      flex: 1,
      marginHorizontal: 5,
    },
    recurringDetails: {
      backgroundColor: tema === "dark" ? "#444" : "#f5f5f5",
      padding: 12,
      borderRadius: 8,
      marginTop: 16,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {idioma === "es" ? "Resumen del Pedido" : "Order Summary"}
      </Text>

      <Text style={styles.sectionTitle}>
        {idioma === "es" ? "Restaurante:" : "Restaurant:"} {restaurant.nombre}
      </Text>

      <Text style={styles.sectionTitle}>
        {idioma === "es" ? "Items Pedidos:" : "Ordered Items:"}
      </Text>

      {items.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.itemName}>
            {item.nombre} - ${item.totalPrice.toFixed(2)}
          </Text>
          {item.preparation && (
            <Text style={styles.itemDetails}>
              {idioma === "es" ? "Preparación:" : "Preparation:"}{" "}
              {item.preparation}
            </Text>
          )}
          {item.extraIngredients && item.extraIngredients.length > 0 && (
            <Text style={styles.itemDetails}>
              {idioma === "es" ? "Ingredientes extra:" : "Extra ingredients:"}
              {item.extraIngredients.join(", ")}
            </Text>
          )}
        </View>
      ))}

      {isRecurring && (
        <View style={styles.recurringDetails}>
          <Text style={styles.sectionTitle}>
            {idioma === "es" ? "Pedido Recurrente" : "Recurring Order"}
          </Text>
          <Text style={styles.itemDetails}>
            {idioma === "es" ? "Días:" : "Days:"} {selectedDays.join(", ")}
          </Text>
          <Text style={styles.itemDetails}>
            {idioma === "es" ? "Hora:" : "Time:"} {selectedTime}
          </Text>
        </View>
      )}

      <Text style={styles.total}>
        {idioma === "es" ? "Total:" : "Total:"} ${total.toFixed(2)}
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title={idioma === "es" ? "Volver Atrás" : "Go Back"}
          onPress={handleGoBackToEdit}
          style={styles.button}
        />
        <Button
          title={idioma === "es" ? "Confirmar Pedido" : "Confirm Order"}
          onPress={handleConfirmOrder}
          disabled={isLoading}
          style={styles.button}
        />
      </View>
    </ScrollView>
  );
};

export default OrderSummary;

import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { AppContext } from "../Context/AppContext";

const RealizarPedido = ({ route, navigation }) => {
  const { dishName, basePrice, baseIngredients } = route.params;
  const { state } = useContext(AppContext);
  const { isDarkMode, isEnglish } = state;

  const [selectedIngredients, setSelectedIngredients] =
    useState(baseIngredients);
  const [extraIngredients, setExtraIngredients] = useState([]);
  const [removedIngredients, setRemovedIngredients] = useState([]);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [orderType, setOrderType] = useState("inmediato");
  const [selectedDays, setSelectedDays] = useState([]);

  const handleIngredientToggle = (ingredient) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(
        selectedIngredients.filter((item) => item !== ingredient)
      );
      setRemovedIngredients([...removedIngredients, ingredient]);
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
      setRemovedIngredients(
        removedIngredients.filter((item) => item !== ingredient)
      );
    }
  };

  const handleExtraIngredients = (text) => {
    setExtraIngredients(text.split(",").map((item) => item.trim()));
  };

  const calculateCustomPrice = () => {
    return basePrice + extraIngredients.length * 2; // Ejemplo simple
  };

  const handleOrderTypeChange = (type) => {
    setOrderType(type);
  };

  const handleDaySelection = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleConfirmOrder = () => {
    const customOrder = {
      dishName,
      selectedIngredients,
      extraIngredients,
      removedIngredients,
      specialInstructions,
      orderType,
      selectedDays,
      totalPrice: calculateCustomPrice(),
    };
    navigation.navigate("OrderSummary", { customOrder });
  };

  const styles = getStyles(isDarkMode);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{dishName}</Text>

      <Text style={styles.sectionTitle}>
        {isEnglish ? "Base Ingredients" : "Ingredientes Base"}
      </Text>
      {baseIngredients.map((ingredient, index) => (
        <View key={index} style={styles.ingredientItem}>
          <CheckBox
            value={selectedIngredients.includes(ingredient)}
            onValueChange={() => handleIngredientToggle(ingredient)}
            tintColors={{
              true: isDarkMode ? "#fff" : "#000",
              false: isDarkMode ? "#fff" : "#000",
            }}
          />
          <Text style={styles.text}>{ingredient}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>
        {isEnglish ? "Extra Ingredients" : "Ingredientes Extra"}
      </Text>
      <TextInput
        style={styles.input}
        placeholder={
          isEnglish
            ? "Add extra ingredients (comma separated)"
            : "Añade ingredientes extra (separados por comas)"
        }
        onChangeText={handleExtraIngredients}
        placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
      />

      <Text style={styles.sectionTitle}>
        {isEnglish ? "Special Instructions" : "Indicaciones Especiales"}
      </Text>
      <TextInput
        style={styles.input}
        placeholder={
          isEnglish
            ? "E.g.: No salt, extra spicy"
            : "Ej: Sin sal, extra picante"
        }
        onChangeText={setSpecialInstructions}
        placeholderTextColor={isDarkMode ? "#aaa" : "#888"}
      />

      <Text style={styles.sectionTitle}>
        {isEnglish ? "Order Type" : "Tipo de Pedido"}
      </Text>
      <View style={styles.orderTypeContainer}>
        <Button
          title={isEnglish ? "Immediate Order" : "Pedido Inmediato"}
          onPress={() => handleOrderTypeChange("inmediato")}
          color={orderType === "inmediato" ? "green" : "gray"}
        />
        <Button
          title={isEnglish ? "Continued Order" : "Pedido Continuado"}
          onPress={() => handleOrderTypeChange("continuado")}
          color={orderType === "continuado" ? "green" : "gray"}
        />
      </View>

      {orderType === "continuado" && (
        <View>
          <Text style={styles.sectionTitle}>
            {isEnglish ? "Select Days" : "Selecciona los días"}
          </Text>
          {[
            isEnglish ? "Monday" : "Lunes",
            isEnglish ? "Tuesday" : "Martes",
            isEnglish ? "Wednesday" : "Miércoles",
            isEnglish ? "Thursday" : "Jueves",
            isEnglish ? "Friday" : "Viernes",
            isEnglish ? "Saturday" : "Sábado",
            isEnglish ? "Sunday" : "Domingo",
          ].map((day, index) => (
            <View key={index} style={styles.dayItem}>
              <CheckBox
                value={selectedDays.includes(day)}
                onValueChange={() => handleDaySelection(day)}
                tintColors={{
                  true: isDarkMode ? "#fff" : "#000",
                  false: isDarkMode ? "#fff" : "#000",
                }}
              />
              <Text style={styles.text}>{day}</Text>
            </View>
          ))}
        </View>
      )}

      <Button
        title={isEnglish ? "Confirm Order" : "Confirmar Pedido"}
        onPress={handleConfirmOrder}
      />
    </ScrollView>
  );
};

const getStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: isDarkMode ? "#333" : "#fff",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 16,
      color: isDarkMode ? "#fff" : "#000",
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 16,
      marginBottom: 8,
      color: isDarkMode ? "#fff" : "#000",
    },
    ingredientItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: isDarkMode ? "#555" : "#ccc",
      borderRadius: 4,
      padding: 8,
      marginBottom: 16,
      color: isDarkMode ? "#fff" : "#000",
    },
    orderTypeContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: 16,
    },
    dayItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    text: {
      color: isDarkMode ? "#fff" : "#000",
    },
  });

export default RealizarPedido;

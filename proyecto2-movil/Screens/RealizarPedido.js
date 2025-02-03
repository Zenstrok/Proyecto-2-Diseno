import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { AppContext } from "../Context/AppContext";
import { supabase } from "../services/supabase";

const RealizarPedido = ({ route, navigation }) => {
  const { idioma, tema, texto } = useContext(AppContext);
  const { restaurant } = route.params;
  const [menu, setMenu] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [preparation, setPreparation] = useState("");
  const [extraIngredients, setExtraIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRecurring, setIsRecurring] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [ingredients, setIngredients] = useState([]);

  // Obtener los platos disponibles para el restaurante
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const { data: menuData, error: menuError } = await supabase
          .from("platosbase")
          .select("*")
          .eq("idcocina", restaurant.id);

        const { data: ingredientsData, error: ingredientsError } =
          await supabase
            .from("ingredientes")
            .select("*")
            .eq("idcocina", restaurant.id);

        if (menuError || ingredientsError) {
          console.error("Error fetching data:", menuError || ingredientsError);
          return;
        }

        setMenu(menuData);
        setIngredients(ingredientsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [restaurant.id]);

  // Función para manejar la selección de un plato
  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  // Función para agregar un plato personalizado al pedido
  const handleAddCustomizedItem = () => {
    const extraIngredientsTotal = extraIngredients.reduce(
      (acc, ingredientName) => {
        const ingredient = ingredients.find(
          (ing) => ing.nombre === ingredientName
        );
        return acc + (ingredient ? ingredient.preciocambio : 0);
      },
      0
    );

    const customizedItem = {
      ...selectedItem,
      preparation,
      extraIngredients,
      extraIngredientsTotal,
      totalPrice: selectedItem.preciobase + extraIngredientsTotal,
    };
    setSelectedItems([...selectedItems, customizedItem]);
    setModalVisible(false);
    setPreparation("");
    setExtraIngredients([]);
  };

  // Función para eliminar un plato del pedido
  const handleRemoveItem = (index) => {
    const newSelectedItems = selectedItems.filter((_, i) => i !== index);
    setSelectedItems(newSelectedItems);
  };

  // Función para manejar el pedido continuado
  const handleRecurringOrder = () => {
    if (isRecurring && (!selectedDays.length || !selectedTime)) {
      Alert.alert(
        idioma === "es" ? "Error" : "Error",
        idioma === "es"
          ? "Por favor selecciona los días y la hora"
          : "Please select days and time"
      );
      return;
    }

    const orderDetails = {
      restaurant: restaurant,
      items: selectedItems,
      total: selectedItems.reduce((acc, item) => acc + item.totalPrice, 0),
      isRecurring,
      selectedDays,
      selectedTime,
    };

    navigation.navigate("OrderSummary", orderDetails);
  };

  // Función para obtener estilos dinámicos
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
        marginBottom: 8,
        backgroundColor: tema === "dark" ? "#444" : "#f5f5f5",
        position: "relative",
      },
      availabilityIndicator: {
        position: "absolute",
        top: 8,
        right: 8,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "green",
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
      selectedItemContainer: {
        marginBottom: 12,
      },
      selectedItem: {
        fontSize: texto === "sm" ? 14 : texto === "md" ? 16 : 18,
        color: tema === "dark" ? "#fff" : "#000",
        marginBottom: 4,
      },
      customizationText: {
        fontSize: texto === "sm" ? 12 : texto === "md" ? 14 : 16,
        color: tema === "dark" ? "#ccc" : "#666",
        marginBottom: 4,
      },
      total: {
        fontSize: texto === "sm" ? 16 : texto === "md" ? 18 : 20,
        fontWeight: "bold",
        color: tema === "dark" ? "#fff" : "#000",
        marginTop: 8,
      },
      recurringOrderContainer: {
        marginTop: 20,
        marginBottom: 20,
      },
      dayButton: {
        padding: 10,
        marginRight: 10,
        borderRadius: 20,
        marginBottom: 8,
      },
      modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
      modalContent: {
        width: "80%",
        padding: 20,
        backgroundColor: tema === "dark" ? "#444" : "#fff",
        borderRadius: 8,
      },
      modalTitle: {
        fontSize: texto === "sm" ? 18 : texto === "md" ? 20 : 22,
        fontWeight: "bold",
        marginBottom: 16,
        color: tema === "dark" ? "#fff" : "#000",
      },
      input: {
        height: 40,
        borderColor: tema === "dark" ? "#ccc" : "#666",
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
        marginBottom: 12,
        color: tema === "dark" ? "#fff" : "#000",
      },
      loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      ingredientItem: {
        padding: 8,
        marginBottom: 8,
        borderRadius: 4,
        backgroundColor: tema === "dark" ? "#555" : "#ddd",
      },
      selectedIngredient: {
        backgroundColor: tema === "dark" ? "#f1593e" : "#f1593e",
      },
    });

  const styles = getStyles(tema, texto);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{restaurant.nombre}</Text>

      <Text style={styles.sectionTitle}>
        {idioma === "es" ? "Menú Disponible" : "Available Menu"}
      </Text>

      {menu.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.menuItem}
          onPress={() => handleSelectItem(item)}
          disabled={!item.disponible}
        >
          {item.disponible && <View style={styles.availabilityIndicator} />}
          <View>
            <Text style={styles.itemName}>{item.nombre}</Text>
            <Text style={styles.itemDescription}>{item.descripcion}</Text>
            <Text style={styles.itemPrice}>${item.preciobase}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <View style={styles.selectedItemsContainer}>
        <Text style={styles.sectionTitle}>
          {idioma === "es" ? "Items Seleccionados" : "Selected Items"}
        </Text>
        {selectedItems.map((item, index) => (
          <View key={index} style={styles.selectedItemContainer}>
            <Text style={styles.selectedItem}>
              {item.nombre} - ${item.totalPrice.toFixed(2)}
            </Text>
            {item.preparation && (
              <Text style={styles.customizationText}>
                {idioma === "es" ? "Preparación: " : "Preparation: "}
                {item.preparation}
              </Text>
            )}
            {item.extraIngredients.length > 0 && (
              <Text style={styles.customizationText}>
                {idioma === "es"
                  ? "Ingredientes extra: "
                  : "Extra ingredients: "}
                {item.extraIngredients.join(", ")} (+$
                {item.extraIngredientsTotal.toFixed(2)})
              </Text>
            )}
            <Button
              title={idioma === "es" ? "Eliminar" : "Remove"}
              onPress={() => handleRemoveItem(index)}
              color="red"
            />
          </View>
        ))}
        {selectedItems.length > 0 && (
          <Text style={styles.total}>
            Total: $
            {selectedItems
              .reduce((acc, item) => acc + item.totalPrice, 0)
              .toFixed(2)}
          </Text>
        )}
      </View>

      <View style={styles.recurringOrderContainer}>
        <Text style={styles.sectionTitle}>
          {idioma === "es" ? "Pedido Continuado" : "Recurring Order"}
        </Text>
        <Button
          title={
            isRecurring
              ? idioma === "es"
                ? "Desactivar Pedido Continuado"
                : "Disable Recurring Order"
              : idioma === "es"
              ? "Activar Pedido Continuado"
              : "Enable Recurring Order"
          }
          onPress={() => setIsRecurring(!isRecurring)}
        />
        {isRecurring && (
          <>
            <Text style={styles.sectionTitle}>
              {idioma === "es" ? "Seleccionar Días" : "Select Days"}
            </Text>
            {[
              "Lunes",
              "Martes",
              "Miércoles",
              "Jueves",
              "Viernes",
              "Sábado",
              "Domingo",
            ].map((day) => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.dayButton,
                  {
                    backgroundColor: selectedDays.includes(day)
                      ? "#f1593e"
                      : tema === "dark"
                      ? "#555"
                      : "#ddd",
                  },
                ]}
                onPress={() =>
                  setSelectedDays((prev) =>
                    prev.includes(day)
                      ? prev.filter((d) => d !== day)
                      : [...prev, day]
                  )
                }
              >
                <Text
                  style={{
                    color: selectedDays.includes(day)
                      ? "#fff"
                      : tema === "dark"
                      ? "#fff"
                      : "#000",
                  }}
                >
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
            <Text style={styles.sectionTitle}>
              {idioma === "es" ? "Seleccionar Hora" : "Select Time"}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={idioma === "es" ? "HH:MM" : "HH:MM"}
              value={selectedTime}
              onChangeText={setSelectedTime}
            />
          </>
        )}
      </View>

      <Button
        title={idioma === "es" ? "Realizar Pedido" : "Place Order"}
        onPress={handleRecurringOrder}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {idioma === "es" ? "Personalizar plato" : "Customize dish"}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={
                idioma === "es"
                  ? "Forma de preparación"
                  : "Preparation instructions"
              }
              value={preparation}
              onChangeText={setPreparation}
            />
            <Text style={styles.sectionTitle}>
              {idioma === "es" ? "Ingredientes extra" : "Extra ingredients"}
            </Text>
            {ingredients.map((ingredient) => (
              <TouchableOpacity
                key={ingredient.id}
                style={[
                  styles.ingredientItem,
                  extraIngredients.includes(ingredient.nombre) &&
                    styles.selectedIngredient,
                ]}
                onPress={() =>
                  setExtraIngredients((prev) =>
                    prev.includes(ingredient.nombre)
                      ? prev.filter((name) => name !== ingredient.nombre)
                      : [...prev, ingredient.nombre]
                  )
                }
              >
                <Text
                  style={{
                    color: tema === "dark" ? "#fff" : "#000",
                  }}
                >
                  {ingredient.nombre} - ${ingredient.preciocambio.toFixed(2)}
                </Text>
              </TouchableOpacity>
            ))}
            <Button
              title={idioma === "es" ? "Agregar" : "Add"}
              onPress={handleAddCustomizedItem}
            />
            <Button
              title={idioma === "es" ? "Cancelar" : "Cancel"}
              onPress={() => setModalVisible(false)}
              color="red"
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default RealizarPedido;

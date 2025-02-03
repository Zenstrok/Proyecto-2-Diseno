import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { AppContext } from "../Context/AppContext";

const PlatosContinuados = ({ navigation }) => {
  const { idioma, tema, texto } = useContext(AppContext);
  const [pedidos, setPedidos] = useState([
    {
      id: 1,
      restaurante: "Restaurante A",
      platos: ["Plato 1", "Plato 2"],
      hora: "12:00 PM",
      dias: ["Lunes", "Miércoles", "Viernes"],
    },
    {
      id: 2,
      restaurante: "Restaurante B",
      platos: ["Plato 3", "Plato 4"],
      hora: "1:00 PM",
      dias: ["Martes", "Jueves"],
    },
  ]);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState(null);

  const handleEliminarPedido = (id) => {
    setPedidos(pedidos.filter((pedido) => pedido.id !== id));
  };

  const handleEditarPedido = (pedido) => {
    setSelectedPedido(pedido);
    setEditModalVisible(true);
  };

  const handleGuardarCambios = () => {
    setPedidos(
      pedidos.map((p) => (p.id === selectedPedido.id ? selectedPedido : p))
    );
    setEditModalVisible(false);
  };

  const renderModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={editModalVisible}
      onRequestClose={() => setEditModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View
          style={[
            styles.modalContent,
            {
              backgroundColor: tema === "dark" ? "#444" : "#fff",
              borderColor: tema === "dark" ? "#666" : "#ddd",
            },
          ]}
        >
          <Text
            style={[
              styles.modalTitle,
              {
                color: tema === "dark" ? "#fff" : "#000",
                fontSize: texto === "sm" ? 18 : texto === "md" ? 20 : 22,
              },
            ]}
          >
            {idioma === "es" ? "Editar Pedido" : "Edit Order"}
          </Text>

          <TextInput
            style={[
              styles.input,
              {
                color: tema === "dark" ? "#fff" : "#000",
                backgroundColor: tema === "dark" ? "#555" : "#f8f8f8",
              },
            ]}
            value={selectedPedido?.hora}
            onChangeText={(hora) =>
              setSelectedPedido({ ...selectedPedido, hora })
            }
            placeholder={idioma === "es" ? "Nueva hora" : "New time"}
          />

          <TextInput
            style={[
              styles.input,
              {
                color: tema === "dark" ? "#fff" : "#000",
                backgroundColor: tema === "dark" ? "#555" : "#f8f8f8",
              },
            ]}
            value={selectedPedido?.dias.join(", ")}
            onChangeText={(diasTexto) =>
              setSelectedPedido({
                ...selectedPedido,
                dias: diasTexto.split(",").map((dia) => dia.trim()),
              })
            }
            placeholder={
              idioma === "es"
                ? "Días (separados por coma)"
                : "Days (comma separated)"
            }
          />

          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={[
                styles.modalButton,
                { backgroundColor: tema === "dark" ? "#666" : "#ddd" },
              ]}
              onPress={() => setEditModalVisible(false)}
            >
              <Text style={{ color: tema === "dark" ? "#fff" : "#000" }}>
                {idioma === "es" ? "Cancelar" : "Cancel"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modalButton,
                { backgroundColor: tema === "dark" ? "#444" : "#007bff" },
              ]}
              onPress={handleGuardarCambios}
            >
              <Text style={{ color: tema === "dark" ? "#fff" : "#fff" }}>
                {idioma === "es" ? "Guardar" : "Save"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: tema === "dark" ? "#333" : "#ffffff" },
      ]}
    >
      {renderModal()}
      <Text
        style={[
          styles.headerText,
          {
            color: tema === "dark" ? "#fff" : "#000",
            fontSize: texto === "sm" ? 20 : texto === "md" ? 24 : 28,
          },
        ]}
      >
        {idioma === "es" ? "Platos Continuados" : "Continued Dishes"}
      </Text>

      {pedidos.map((pedido) => (
        <View
          key={pedido.id}
          style={[
            styles.pedidoContainer,
            {
              backgroundColor: tema === "dark" ? "#444" : "#f8f8f8",
            },
          ]}
        >
          <Text
            style={[
              styles.restaurante,
              { color: tema === "dark" ? "#fff" : "#000" },
            ]}
          >
            {pedido.restaurante}
          </Text>
          <Text
            style={[styles.hora, { color: tema === "dark" ? "#ddd" : "#333" }]}
          >
            {idioma === "es" ? "Hora" : "Time"}: {pedido.hora}
          </Text>
          <Text
            style={[styles.dias, { color: tema === "dark" ? "#ddd" : "#333" }]}
          >
            {idioma === "es" ? "Días" : "Days"}: {pedido.dias.join(", ")}
          </Text>
          <Text
            style={[
              styles.platos,
              { color: tema === "dark" ? "#fff" : "#000" },
            ]}
          >
            {idioma === "es" ? "Platos" : "Dishes"}:
          </Text>
          {pedido.platos.map((plato, index) => (
            <Text
              key={index}
              style={[
                styles.plato,
                { color: tema === "dark" ? "#ddd" : "#333" },
              ]}
            >
              {plato}
            </Text>
          ))}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: tema === "dark" ? "#555" : "#ddd" },
              ]}
              onPress={() => handleEditarPedido(pedido)}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: tema === "dark" ? "#fff" : "#000",
                    fontSize: texto === "sm" ? 14 : texto === "md" ? 16 : 18,
                  },
                ]}
              >
                {idioma === "es" ? "Editar" : "Edit"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: tema === "dark" ? "#700" : "#ffcccc" },
              ]}
              onPress={() => handleEliminarPedido(pedido.id)}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: tema === "dark" ? "#fff" : "#000",
                    fontSize: texto === "sm" ? 14 : texto === "md" ? 16 : 18,
                  },
                ]}
              >
                {idioma === "es" ? "Eliminar" : "Delete"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  pedidoContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  restaurante: {
    fontSize: 18,
    fontWeight: "bold",
  },
  hora: {
    fontSize: 16,
    marginTop: 5,
  },
  dias: {
    fontSize: 16,
    marginTop: 5,
  },
  platos: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: "bold",
  },
  plato: {
    fontSize: 14,
    marginLeft: 10,
    marginTop: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
  },
  modalTitle: {
    textAlign: "center",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
});

export default PlatosContinuados;

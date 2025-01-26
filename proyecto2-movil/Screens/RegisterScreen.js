import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const listaAlergias = [
  "Maní",
  "Lácteos",
  "Mariscos",
  "Gluten",
  "Huevos",
  "Soja",
];

const RegisterScreen = ({ navigation }) => {
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [alergiasSeleccionadas, setAlergiasSeleccionadas] = useState([]);
  const [ingredientesNoGustan, setIngredientesNoGustan] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");

  const alternarAlergia = (alergia) => {
    setAlergiasSeleccionadas((prev) =>
      prev.includes(alergia)
        ? prev.filter((item) => item !== alergia)
        : [...prev, alergia]
    );
  };

  const manejarRegistro = () => {
    if (contraseña !== confirmarContraseña) {
      alert("Las contraseñas no coinciden");
      return;
    }
    alert("Registro exitoso");
    navigation.navigate("Login");
  };

  return (
    <ScrollView style={styles.contenedor}>
      <Text style={styles.titulo}>Registro</Text>
      <TextInput
        style={styles.entrada}
        placeholder="Número de teléfono"
        keyboardType="phone-pad"
        value={telefono}
        onChangeText={setTelefono}
      />
      <TextInput
        style={styles.entrada}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        value={correo}
        onChangeText={setCorreo}
      />
      <TextInput
        style={styles.entrada}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.entrada}
        placeholder="Apellidos"
        value={apellidos}
        onChangeText={setApellidos}
      />
      <Text style={styles.etiqueta}>Alergias (seleccione si aplica):</Text>
      <View style={styles.contenedorAlergias}>
        {listaAlergias.map((alergia) => (
          <TouchableOpacity
            key={alergia}
            style={[
              styles.itemAlergia,
              alergiasSeleccionadas.includes(alergia) &&
                styles.alergiaSeleccionada,
            ]}
            onPress={() => alternarAlergia(alergia)}
          >
            <Text
              style={[
                styles.textoAlergia,
                alergiasSeleccionadas.includes(alergia) &&
                  styles.textoAlergiaSeleccionado,
              ]}
            >
              {alergia}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        style={styles.entrada}
        placeholder="Ingredientes que no te gustan"
        value={ingredientesNoGustan}
        onChangeText={setIngredientesNoGustan}
      />
      <TextInput
        style={styles.entrada}
        placeholder="Contraseña"
        secureTextEntry
        value={contraseña}
        onChangeText={setContraseña}
      />
      <TextInput
        style={styles.entrada}
        placeholder="Confirmar contraseña"
        secureTextEntry
        value={confirmarContraseña}
        onChangeText={setConfirmarContraseña}
      />
      <Button title="Registrarse" onPress={manejarRegistro} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contenedor: { flex: 1, padding: 20, backgroundColor: "#ffffff" },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  entrada: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  etiqueta: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  contenedorAlergias: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  itemAlergia: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    margin: 5,
  },
  alergiaSeleccionada: { backgroundColor: "#4CAF50", borderColor: "#4CAF50" },
  textoAlergia: { color: "#000" },
  textoAlergiaSeleccionado: { color: "#fff" },
});

export default RegisterScreen;

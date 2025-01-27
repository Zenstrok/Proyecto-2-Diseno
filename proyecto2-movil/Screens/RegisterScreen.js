import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { AppContext } from "../Context/AppContext";

const RegisterScreen = ({ navigation }) => {
  const { state } = useContext(AppContext);
  const { isDarkMode, isEnglish } = state;
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");

  const manejarRegistro = () => {
    if (contraseña !== confirmarContraseña) {
      alert(
        isEnglish ? "Passwords do not match" : "Las contraseñas no coinciden"
      );
      return;
    }
    alert(isEnglish ? "Registration successful" : "Registro exitoso");
    navigation.navigate("Login");
  };

  return (
    <ScrollView
      style={[
        styles.contenedor,
        { backgroundColor: isDarkMode ? "#333" : "#ffffff" },
      ]}
    >
      <Text style={[styles.titulo, { color: isDarkMode ? "#fff" : "#000" }]}>
        {isEnglish ? "Register" : "Registro"}
      </Text>
      <TextInput
        style={styles.entrada}
        placeholder={isEnglish ? "Phone number" : "Número de teléfono"}
        keyboardType="phone-pad"
        value={telefono}
        onChangeText={setTelefono}
      />
      <TextInput
        style={styles.entrada}
        placeholder={isEnglish ? "Email" : "Correo electrónico"}
        keyboardType="email-address"
        value={correo}
        onChangeText={setCorreo}
      />
      <TextInput
        style={styles.entrada}
        placeholder={isEnglish ? "First name" : "Nombre"}
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.entrada}
        placeholder={isEnglish ? "Last name" : "Apellidos"}
        value={apellidos}
        onChangeText={setApellidos}
      />
      <TextInput
        style={styles.entrada}
        placeholder={isEnglish ? "Password" : "Contraseña"}
        secureTextEntry
        value={contraseña}
        onChangeText={setContraseña}
      />
      <TextInput
        style={styles.entrada}
        placeholder={isEnglish ? "Confirm password" : "Confirmar contraseña"}
        secureTextEntry
        value={confirmarContraseña}
        onChangeText={setConfirmarContraseña}
      />
      <Button
        title={isEnglish ? "Register" : "Registrarse"}
        onPress={manejarRegistro}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contenedor: { flex: 1, padding: 20 },
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
});

export default RegisterScreen;

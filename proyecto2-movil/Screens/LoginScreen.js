import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { AppContext } from "../Context/AppContext"; // Importa el AppContext

const LoginScreen = ({ navigation }) => {
  const { state, dispatch } = useContext(AppContext);
  const { isDarkMode, isEnglish } = state;
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");

  const manejarIngreso = () => {
    // Lógica de autenticación
    if (correo === "qwert" && contraseña === "12345") {
      dispatch({ type: "LOGIN", payload: { name: "Usuario" } });
      navigation.navigate("House");
    } else {
      alert(
        isEnglish
          ? "Incorrect email or password"
          : "Correo o contraseña incorrectos"
      );
    }
  };

  return (
    <View
      style={[
        styles.contenedor,
        { backgroundColor: isDarkMode ? "#333" : "#ffffff" },
      ]}
    >
      <Text style={[styles.titulo, { color: isDarkMode ? "#fff" : "#000" }]}>
        {isEnglish ? "Login" : "Inicio de Sesión"}
      </Text>
      <TextInput
        style={styles.entrada}
        placeholder={isEnglish ? "Email" : "Correo electrónico"}
        keyboardType="email-address"
        value={correo}
        onChangeText={setCorreo}
      />
      <TextInput
        style={styles.entrada}
        placeholder={isEnglish ? "Password" : "Contraseña"}
        secureTextEntry
        value={contraseña}
        onChangeText={setContraseña}
      />
      <Button
        title={isEnglish ? "Login" : "Ingresar"}
        onPress={manejarIngreso}
      />
      <Button
        title={isEnglish ? "Register" : "Registrarse"}
        onPress={() => navigation.navigate("Register")}
      />
    </View>
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

export default LoginScreen;

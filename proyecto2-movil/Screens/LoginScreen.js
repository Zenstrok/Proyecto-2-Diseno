import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { AppContext } from "../Context/AppContext";
import { supabase } from "../services/supabase";

const LoginScreen = ({ navigation }) => {
  const { setUsuario } = useContext(AppContext);
  const [formData, setFormData] = useState({ usuario: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const { usuario, password } = formData;

    // Buscar el usuario en la base de datos
    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("correoelectronico", usuario)
      .single();

    if (error || !data) {
      setMessage("Correo o contraseña inválidos");
      return;
    }

    // Comparar la contraseña directamente
    if (password === data.hash) {
      setUsuario(data);
      navigation.navigate("House");
    } else {
      setMessage("Correo o contraseña inválidos");
    }
  };

  return (
    <View style={[styles.contenedor, { backgroundColor: "#ffffff" }]}>
      <Text style={[styles.titulo, { color: "#000" }]}>
        {"Inicio de Sesión"}
      </Text>
      <TextInput
        style={styles.entrada}
        placeholder={"Correo electrónico"}
        keyboardType="email-address"
        value={formData.usuario}
        onChangeText={(value) => handleChange("usuario", value)}
      />
      <TextInput
        style={styles.entrada}
        placeholder={"Contraseña"}
        secureTextEntry
        value={formData.password}
        onChangeText={(value) => handleChange("password", value)}
      />
      <Button title={"Ingresar"} onPress={handleSubmit} />
      <Button
        title={"Registrarse"}
        onPress={() => navigation.navigate("Register")}
      />
      {message && (
        <Text
          style={{
            color: "#000",
            marginTop: 20,
            textAlign: "center",
          }}
        >
          {message}
        </Text>
      )}
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

import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Button, TextInput, Image } from "react-native";
import { AppContext } from "../Context/AppContext"; // Importa el AppContext

export default function Cuenta({ navigation }) {
  /* const { state, dispatch } = useContext(AppContext); // Usa el contexto
  const { user, isDarkMode, isEnglish } = state;
  const [name, setName] = useState(user.name);
  const [photo, setPhoto] = useState(null);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    alert(isEnglish ? "Logged out" : "Sesión cerrada");
    navigation.navigate("Login");
  };

  const handleSave = () => {
    // Lógica para guardar cambios
    alert(isEnglish ? "Changes saved" : "Cambios guardados");
  };

  const handlePhotoChange = () => {
    // Lógica para cambiar la foto
    alert(isEnglish ? "Photo changed" : "Foto cambiada");
  };

  return (
    <View
      style={[
        styles.main,
        { backgroundColor: isDarkMode ? "#333" : "#f9f9f9" },
      ]}
    >
      <Text
        style={[styles.headerText, { color: isDarkMode ? "#fff" : "#f1593e" }]}
      >
        {isEnglish ? "Account" : "Cuenta"}
      </Text>
      <Image source={photo} style={styles.photo} />
      <Button
        title={isEnglish ? "Change Photo" : "Cambiar Foto"}
        onPress={handlePhotoChange}
      />
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder={isEnglish ? "Username" : "Nombre de usuario"}
      />
      <Button
        title={isEnglish ? "Save Changes" : "Guardar Cambios"}
        onPress={handleSave}
      />
      <Button
        title={isEnglish ? "Logout" : "Cerrar sesión"}
        onPress={handleLogout}
      />
    </View>
  ); */
  return (
    <View style={styles.main}>
      <Text>Hola</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    width: "80%",
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
});

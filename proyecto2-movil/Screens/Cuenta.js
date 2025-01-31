import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Button, TextInput, Image } from "react-native";
import { AppContext } from "../Context/AppContext";

export default function Cuenta({ navigation }) {
  const { usuario, idioma, tema, texto, setUsuario } = useContext(AppContext);
  const [name, setName] = useState(usuario?.nombre || "");
  const [photo, setPhoto] = useState(null);

  const handleLogout = () => {
    setUsuario(null);
    alert(idioma === "es" ? "Sesión cerrada" : "Logged out");
    navigation.navigate("Login");
  };

  const handleSave = () => {
    setUsuario({ ...usuario, nombre: name });
    alert(idioma === "es" ? "Cambios guardados" : "Changes saved");
  };

  const handlePhotoChange = () => {
    alert(idioma === "es" ? "Foto cambiada" : "Photo changed");
  };

  return (
    <View
      style={[
        styles.main,
        { backgroundColor: tema === "dark" ? "#333" : "#f9f9f9" },
      ]}
    >
      <Text
        style={[
          styles.headerText,
          {
            color: tema === "dark" ? "#fff" : "#f1593e",
            fontSize: texto === "sm" ? 20 : texto === "md" ? 24 : 28,
          },
        ]}
      >
        {idioma === "es" ? "Cuenta" : "Account"}
      </Text>
      <Image source={photo} style={styles.photo} />
      <Button
        title={idioma === "es" ? "Cambiar Foto" : "Change Photo"}
        onPress={handlePhotoChange}
      />
      <TextInput
        style={[
          styles.input,
          { fontSize: texto === "sm" ? 14 : texto === "md" ? 16 : 18 },
        ]}
        value={name}
        onChangeText={setName}
        placeholder={idioma === "es" ? "Nombre de usuario" : "Username"}
      />
      <Button
        title={idioma === "es" ? "Guardar Cambios" : "Save Changes"}
        onPress={handleSave}
      />
      <Button
        title={idioma === "es" ? "Cerrar sesión" : "Logout"}
        onPress={handleLogout}
      />
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

import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { AppContext } from "../Context/AppContext";

const Configuracion = () => {
  /* const { state, dispatch } = useContext(AppContext);
  const { isDarkMode, isEnglish } = state;

  const toggleTheme = () => {
    dispatch({ type: "TOGGLE_DARK_MODE" });
  };

  const toggleLanguage = () => {
    dispatch({ type: "TOGGLE_LANGUAGE" });
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#333" : "#fff" },
      ]}
    >
      <Text style={[styles.title, { color: isDarkMode ? "#fff" : "#000" }]}>
        {isEnglish ? "Settings" : "Configuración"}
      </Text>
      <Button
        title={isEnglish ? "Change Theme" : "Cambiar Tema"}
        onPress={toggleTheme}
      />
      <Button
        title={isEnglish ? "Change Language" : "Cambiar Idioma"}
        onPress={toggleLanguage}
      />
    </View>
  ); */
  return (
    <View style={styles.main}>
      <Text>Hola</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 20,
    textAlign: "center",
  },
});

export default Configuracion;

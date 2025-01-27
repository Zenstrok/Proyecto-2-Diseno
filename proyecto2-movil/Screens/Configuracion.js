import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const Configuracion = () => {
  const [theme, setTheme] = useState("light"); // 'light' or 'dark'
  const [language, setLanguage] = useState("en"); // 'en' or 'es'

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "es" : "en"));
  };

  return (
    <View
      style={theme === "light" ? styles.lightContainer : styles.darkContainer}
    >
      <Text style={styles.title}>
        {language === "en" ? "Settings" : "Configuración"}
      </Text>
      <Button
        title={language === "en" ? "Change Theme" : "Cambiar Tema"}
        onPress={toggleTheme}
      />
      <Button
        title={language === "en" ? "Change Language" : "Cambiar Idioma"}
        onPress={toggleLanguage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  lightContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  darkContainer: {
    flex: 1,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f1593e",
    margin: 20,
    textAlign: "center",
  },
  setting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 10,
  },
});

export default Configuracion;

import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AppContext } from "../Context/AppContext";

const Configuracion = () => {
  const { tema, setTema, idioma, setIdioma, texto, setTexto } =
    useContext(AppContext);

  const translations = {
    es: {
      settings: "Configuración",
      theme: "Tema",
      light: "Claro",
      dark: "Oscuro",
      language: "Idioma",
      spanish: "Español",
      english: "Inglés",
      fontSize: "Tamaño de texto",
      small: "Pequeño",
      medium: "Mediano",
      large: "Grande",
    },
    en: {
      settings: "Settings",
      theme: "Theme",
      light: "Light",
      dark: "Dark",
      language: "Language",
      spanish: "Spanish",
      english: "English",
      fontSize: "Font Size",
      small: "Small",
      medium: "Medium",
      large: "Large",
    },
  };

  const t = translations[idioma];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: tema === "dark" ? "#333" : "#fff" },
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            color: tema === "dark" ? "#fff" : "#000",
            fontSize: texto === "gr" ? 28 : texto === "md" ? 24 : 20,
          },
        ]}
      >
        {t.settings}
      </Text>

      {/* Tema */}
      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: tema === "dark" ? "#fff" : "#000",
              fontSize: texto === "gr" ? 22 : texto === "md" ? 18 : 16,
            },
          ]}
        >
          {t.theme}
        </Text>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[styles.option, tema === "light" && styles.selectedOption]}
            onPress={() => setTema("light")}
          >
            <Text
              style={[
                styles.optionText,
                {
                  color: tema === "dark" ? "#fff" : "#000",
                  fontSize: texto === "gr" ? 18 : texto === "md" ? 16 : 14,
                },
              ]}
            >
              {t.light}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, tema === "dark" && styles.selectedOption]}
            onPress={() => setTema("dark")}
          >
            <Text
              style={[
                styles.optionText,
                {
                  color: tema === "dark" ? "#fff" : "#000",
                  fontSize: texto === "gr" ? 18 : texto === "md" ? 16 : 14,
                },
              ]}
            >
              {t.dark}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Idioma */}
      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: tema === "dark" ? "#fff" : "#000",
              fontSize: texto === "gr" ? 22 : texto === "md" ? 18 : 16,
            },
          ]}
        >
          {t.language}
        </Text>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[styles.option, idioma === "es" && styles.selectedOption]}
            onPress={() => setIdioma("es")}
          >
            <Text
              style={[
                styles.optionText,
                {
                  color: tema === "dark" ? "#fff" : "#000",
                  fontSize: texto === "gr" ? 18 : texto === "md" ? 16 : 14,
                },
              ]}
            >
              {t.spanish}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, idioma === "en" && styles.selectedOption]}
            onPress={() => setIdioma("en")}
          >
            <Text
              style={[
                styles.optionText,
                {
                  color: tema === "dark" ? "#fff" : "#000",
                  fontSize: texto === "gr" ? 18 : texto === "md" ? 16 : 14,
                },
              ]}
            >
              {t.english}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tamaño de texto */}
      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: tema === "dark" ? "#fff" : "#000",
              fontSize: texto === "gr" ? 22 : texto === "md" ? 18 : 16,
            },
          ]}
        >
          {t.fontSize}
        </Text>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[styles.option, texto === "pq" && styles.selectedOption]}
            onPress={() => setTexto("pq")}
          >
            <Text
              style={[
                styles.optionText,
                {
                  color: tema === "dark" ? "#fff" : "#000",
                  fontSize: texto === "gr" ? 18 : texto === "md" ? 16 : 14,
                },
              ]}
            >
              {t.small}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, texto === "md" && styles.selectedOption]}
            onPress={() => setTexto("md")}
          >
            <Text
              style={[
                styles.optionText,
                {
                  color: tema === "dark" ? "#fff" : "#000",
                  fontSize: texto === "gr" ? 18 : texto === "md" ? 16 : 14,
                },
              ]}
            >
              {t.medium}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, texto === "gr" && styles.selectedOption]}
            onPress={() => setTexto("gr")}
          >
            <Text
              style={[
                styles.optionText,
                {
                  color: tema === "dark" ? "#fff" : "#000",
                  fontSize: texto === "gr" ? 18 : texto === "md" ? 16 : 14,
                },
              ]}
            >
              {t.large}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontWeight: "600",
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  option: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    minWidth: 100,
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  optionText: {
    textAlign: "center",
  },
});

export default Configuracion;

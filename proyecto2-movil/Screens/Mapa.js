import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AppContext } from "../Context/AppContext";

export default function Mapa() {
  const { state } = useContext(AppContext);
  const { isDarkMode, isEnglish } = state;

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
        {isEnglish ? "Map" : "Mapa"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 20,
    textAlign: "center",
  },
});
